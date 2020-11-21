import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NoteModel} from '../../../../../models/workplacemodels/note.model';
import {ThreadModel} from '../../../../../models/workplacemodels/thread.model';
import {Select, Store} from '@ngxs/store';
import {AddWorkplaceElement, DeleteWorkplaceElement} from '../../../../../store/workplace-element';
import {UserModel} from '../../../../../models/user.model';
import {LabelModel} from '../../../../../models/label.model';
import {WorkplaceSettingsState} from '../../../../../store/workplace-settings';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-note-thread-dialog',
  templateUrl: './note-thread-dialog.component.html',
  styleUrls: ['./note-thread-dialog.component.css']
})
export class NoteThreadDialogComponent implements OnInit {
  private index: number;
  type: string;
  element: ThreadModel | NoteModel;
  isUpdateState: boolean;

  @Select(WorkplaceSettingsState.users)
  users$: Observable<UserModel[]>;

  @Select(WorkplaceSettingsState.labels)
  labels$: Observable<LabelModel[]>;

  users: UserModel[] = [];
  labels: LabelModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private store: Store) {}

  ngOnInit(): void {
    this.index = this.data?.index;
    this.type = this.data.type;
    this.element = this.data?.object;
    this.isUpdateState = this.element !== undefined;
  }

  handleElement(form: NgForm): void {
    const data = {
      id: this.element?.id ?? null,
      backGroundColor: this.element?.backGroundColor ?? null,
      name: form.value.name,
      description: form.value.description,
      assignedUsers: this.users,
      assignedLabels: this.labels,
    };
    this.setDueDate(data, form);
    this.store.dispatch(new AddWorkplaceElement(data, this?.index));
  }

  private setDueDate(data: { name: any; description: any }, form: NgForm): void {
    if (this.type === 'Note') {
      const temp = 'dueDate';
      data[temp] = new Date(form.value.notificationDate);
    }
  }

  delete(): void {
    this.store.dispatch(new DeleteWorkplaceElement(this.index));
  }

  ////////////////////////////////// ELEMENT ACTIONS ///////////////////////////////////////
  addElement(element: UserModel | LabelModel): void {
    if (element instanceof LabelModel) {
      this.labels.push(element);
    } else {
      this.users.push(element);
    }
  }

  removeElement(element: UserModel | LabelModel, i: number): void {
    if (element instanceof LabelModel) {
      this.labels.splice(i, 1);
    } else {
      this.users.splice(i, 1);
    }
  }
}
