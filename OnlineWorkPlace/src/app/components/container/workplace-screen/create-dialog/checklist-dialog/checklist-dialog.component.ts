import {Component, Inject, OnInit} from '@angular/core';
import {TaskModel} from '../../../../../models/workplacemodels/task.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChecklistModel} from '../../../../../models/workplacemodels/checklist.model';
import {Select} from '@ngxs/store';
import {NgForm} from '@angular/forms';
import {LabelModel} from '../../../../../models/application-models/label.model';
import {WorkplaceSettingsState} from '../../../../../store/workplace-settings';
import {Observable} from 'rxjs';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {WorkplaceElementModel} from '../../../../../models/workplacemodels/workplaceelement.model';
import {AddWorkplaceElement} from '../../../../../store/workplace-element';
import {WorkplaceElementApiService} from '../../../../../services/workplace-element-api/workplace-element-api.service';
import {LoginState} from '../../../../../store/login';
import {ApplicationState} from '../../../../../store/application';
import {UtilsMessage} from '../../../../../shared/utils/utils-message';

@Component({
  selector: 'app-checklist-dialog',
  templateUrl: './checklist-dialog.component.html',
  styleUrls: ['./checklist-dialog.component.css']
})
export class ChecklistDialogComponent implements OnInit {
  tasks: TaskModel[] = [];
  element: ChecklistModel;
  labels: LabelModel[] = [];

  @Select(WorkplaceSettingsState.labels)
  labels$: Observable<LabelModel[]>;

  @Select(ApplicationState.currentWorkplaceId)
  workplaceId$: Observable<string>;
  workplaceId: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private workplaceElementService: WorkplaceElementApiService) {
  }

  ngOnInit(): void {
    if (this.data?.object) {
      this.element = this.data.object;
      this.tasks = [...this.element?.taskEntities];
      this.labels = [...this.element.assignedLabels];
    }

    this.workplaceId$.subscribe(workplaceId => this.workplaceId = workplaceId);
  }

  createCheckList(form: NgForm): void {
    const checklist: ChecklistModel = {
      ...form.value,
      assignedLabels: this.labels,
      taskEntities: this.tasks,
      isArchived: false,
      id: this.element?.id ?? null  ,
      type: 'checklist'
    };

    this.workplaceElementService.addWorkPlaceElement(checklist, this.workplaceId)
      .subscribe(data => {
        this.addChecklist(data);
        console.log(checklist);
        UtilsMessage.showMessage(UtilsMessage.MESSAGE_ELEMENT_CREATED, UtilsMessage.MESSAGE_STATUS_POSITIVE);
      });
  }

  ////////////////////////////////// TASKS ACTIONS ///////////////////////////////////////
  addTask(): void {
    this.tasks.push({description: '', assignedUsers: [], completed: false});
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  changeTask(model: { task: TaskModel, index: number }): void {
    this.tasks[model.index] = model.task;
  }

  ////////////////////////////////// LABEL ACTIONS ///////////////////////////////////////
  addLabel(label: LabelModel): void {
    const temp = this.labels.filter(data => data.id == label.id);
    if (temp.length !== 1) {
      this.labels.push(label);
    }
  }

  removeLabel(index: number): void {
    this.labels.splice(index, 1);
  }

  notificationDateFilter(date: Date | null): boolean {
    return date?.getTime() > Date.now();
  }

  @Dispatch()
  addChecklist(element: WorkplaceElementModel): AddWorkplaceElement {
    return new AddWorkplaceElement(element);
  }
}
