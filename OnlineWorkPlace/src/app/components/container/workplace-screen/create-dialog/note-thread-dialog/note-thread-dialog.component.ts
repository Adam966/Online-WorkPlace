import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NoteModel} from '../../../../../models/workplacemodels/note.model';
import {ThreadModel} from '../../../../../models/workplacemodels/thread.model';
import {Select} from '@ngxs/store';
import {AddWorkplaceElement, DeleteWorkplaceElement} from '../../../../../store/workplace-element';
import {UserModel} from '../../../../../models/application-models/user.model';
import {LabelModel} from '../../../../../models/application-models/label.model';
import {WorkplaceSettingsState} from '../../../../../store/workplace-settings';
import {Observable} from 'rxjs';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {Router} from '@angular/router';
import {ApplicationState} from '../../../../../store/application';
import {WorkplaceElementApiService} from '../../../../../services/workplace-element-api/workplace-element-api.service';
import {WorkplaceElementModel} from '../../../../../models/workplacemodels/workplaceelement.model';

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

  @Select(ApplicationState.currentWorkplaceId)
  currentWorkplaceId$!: Observable<string>;
  currentWorkplaceId: string;

  users: UserModel[] = [];
  labels: LabelModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private router: Router, private elementService: WorkplaceElementApiService) {
  }

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

  handleElement(form: NgForm): void {
    const data = {
      id: this.element?.id ?? null,
      name: form.value.name,
      description: form.value.description,
      assignedUsers: this.users,
      assignedLabels: this.labels,
      isArchived: this.element?.isArchived ?? false,
    };
    this.setDueDate(data, form);
    console.log(data);

    this.elementService.addWorkPlaceElement(this.setType(data), this.currentWorkplaceId)
      .subscribe(element => {
        this.storeElement(element, element.id);
      });
  }

  private setDueDate(data: { name: any; description: any }, form: NgForm): void {
    if (this.type === 'Note') {
      const temp = 'dueDate';
      data[temp] = new Date(form.value.notificationDate);
    }
  }

  private setType(data: WorkplaceElementModel): WorkplaceElementModel {
    if (this.type === 'Note') {
      data.type = 'note';
    } else {
      data.type = 'thread';
    }
    return data;
  }

  @Dispatch()
  delete(): DeleteWorkplaceElement {
    return new DeleteWorkplaceElement(this.index);
  }

  @Dispatch()
  storeElement(element: WorkplaceElementModel, index: number): AddWorkplaceElement {
    return new AddWorkplaceElement(element, index);
  }

  ////////////////////////////////// ELEMENT ACTIONS ///////////////////////////////////////
  addElement(element: UserModel | LabelModel): void {
    if ('color' in element) {
      if (!this.labels.includes(element)) {
        this.labels.push(element);
      }
    } else {
      if (!this.users.includes(element)) {
        this.users.push(element);
      }
    }
  }

  removeElement(element: UserModel | LabelModel, i: number): void {
    if ('color' in element) {
      this.labels.splice(i, 1);
    } else {
      this.users.splice(i, 1);
    }
  }

  enterThread(): void {
    this.router.navigate(['main/workplace/' + this.currentWorkplaceId + '/thread/' + this.element.id.toString()]);
  }
}

