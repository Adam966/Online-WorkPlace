import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NoteModel} from '../../../../../models/workplacemodels/note.model';
import {ThreadModel} from '../../../../../models/workplacemodels/thread.model';
import {Select} from '@ngxs/store';
import {AddWorkplaceElement, DeleteWorkplaceElement} from '../../../../../store/workplace-element';
import {User} from '../../../../../models/application-models/user.model';
import {LabelModel} from '../../../../../models/label.model';
import {WorkplaceSettingsState} from '../../../../../store/workplace-settings';
import {Observable} from 'rxjs';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationState} from '../../../../../store/application';

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
  users$: Observable<User[]>;

  @Select(WorkplaceSettingsState.labels)
  labels$: Observable<LabelModel[]>;

  @Select(ApplicationState.currentWorkplaceId)
  currentWorkplaceId$!: Observable<string>;
  currentWorkplaceId: string;

  users: User[] = [];
  labels: LabelModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private router: Router) {}

  ngOnInit(): void {
    this.currentWorkplaceId$.subscribe(data => {
      this.currentWorkplaceId = data;
    });

    this.element = this.data?.object;
    this.isUpdateState = this.element !== undefined;
    this.type = this.data.type;

    if (this.isUpdateState) {
      this.index = this.data?.index;
      this.users = [...this.element?.assignedUsers] ?? [];
      this.labels = [...this.element?.assignedLabels] ?? [];
    }
  }

  @Dispatch()
  handleElement(form: NgForm): AddWorkplaceElement {
    const data = {
      id: this.element?.id ?? null,
      name: form.value.name,
      description: form.value.description,
      assignedUsers: this.users,
      assignedLabels: this.labels,
    };
    this.setDueDate(data, form);
    console.log(data);
    return new AddWorkplaceElement(data, this?.index);
  }

  private setDueDate(data: { name: any; description: any }, form: NgForm): void {
    if (this.type === 'Note') {
      const temp = 'dueDate';
      data[temp] = new Date(form.value.notificationDate);
    }
  }

  @Dispatch()
  delete(): DeleteWorkplaceElement {
    return new DeleteWorkplaceElement(this.index);
  }

  ////////////////////////////////// ELEMENT ACTIONS ///////////////////////////////////////
  addElement(element: User | LabelModel): void {
    if ('color' in element) {
      if (!this.labels.includes(element))
        this.labels.push(element);
    } else {
      if(!this.users.includes(element))
        this.users.push(element);
    }
  }

  removeElement(element: User | LabelModel, i: number): void {
    if ('color' in element) {
      this.labels.splice(i, 1);
    } else {
      this.users.splice(i, 1);
    }
  }

  enterThread(): void  {
    this.router.navigate(['main/workplace/' + this.currentWorkplaceId + '/thread/' + this.element.id.toString()]);
  }
}
