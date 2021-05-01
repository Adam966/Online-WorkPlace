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
import {AddWorkplaceElement, DeleteWorkplaceElement} from '../../../../../store/workplace-element';
import {WorkplaceElementApiService} from '../../../../../services/workplace-element-api/workplace-element-api.service';
import {ApplicationState} from '../../../../../store/application';
import {UserRightModel} from '../../../../../models/rights-model/user-right.model';

@Component({
  selector: 'app-checklist-dialog',
  templateUrl: './checklist-dialog.component.html',
  styleUrls: ['./checklist-dialog.component.css']
})
export class ChecklistDialogComponent implements OnInit {
  tasks: TaskModel[] = [];
  element: ChecklistModel;
  labels: LabelModel[] = [];
  isUpdate = false;
  type = 'checklist';
  index: number;

  @Select(WorkplaceSettingsState.labels)
  labels$: Observable<LabelModel[]>;

  @Select(ApplicationState.currentWorkplaceId)
  currentWorkplaceId$!: Observable<string>;
  currentWorkplaceId: string;

  @Select(WorkplaceSettingsState.userRights)
  userRights$!: Observable<UserRightModel>;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private elementService: WorkplaceElementApiService) { }

  ngOnInit(): void {
    this.currentWorkplaceId$.subscribe(data => {
      this.currentWorkplaceId = data;
    });

    if (this.data?.object) {
      this.index = this.data?.index;
      this.isUpdate = true;
      this.element = this.data.object;
      this.tasks = [...this.element?.taskEntities];
      this.labels = [...this.element.assignedLabels];
    }
  }

  createCheckList(form: NgForm): void {
    const checklist = {
      ...form.value,
      id: this.data.object.id ?? null,
      assignedLabels: this.labels,
      taskEntities: this.tasks,
      type: this.type
    };
    this.sendCheckList(checklist);
  }

  ////////////////////////////////// TASKS ACTIONS ///////////////////////////////////////
  addTask(): void {
    this.tasks.push({description: '', assignedUsers: [], completed: false});
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  changeTask(model: {task: TaskModel, index: number}): void  {
    this.tasks[model.index] = model.task;
  }

  ////////////////////////////////// LABEL ACTIONS ///////////////////////////////////////
  addLabel(label: LabelModel): void {
    const temp = this.labels.filter(data => data.id === label.id);
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
    return new AddWorkplaceElement(element, this.isUpdate);
  }

  private sendCheckList(checklist: WorkplaceElementModel): void {
    this.elementService.addWorkPlaceElement(checklist, this.currentWorkplaceId)
      .subscribe((element) => {
        this.addChecklist(element);
      });
  }

  @Dispatch()
  archive(): DeleteWorkplaceElement {
    this.elementService.archiveWorkplaceElement(this.element.id, +this.currentWorkplaceId)
      .subscribe();
    return new DeleteWorkplaceElement(this.index);
  }
}
