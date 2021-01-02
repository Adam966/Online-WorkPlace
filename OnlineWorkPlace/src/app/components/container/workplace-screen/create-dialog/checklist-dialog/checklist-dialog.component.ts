import {Component, Inject, OnInit} from '@angular/core';
import {TaskModel} from '../../../../../models/workplacemodels/task.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChecklistModel} from '../../../../../models/workplacemodels/checklist.model';
import {Select} from '@ngxs/store';
import {NgForm} from '@angular/forms';
import {LabelModel} from '../../../../../models/label.model';
import {WorkplaceSettingsState} from '../../../../../store/workplace-settings';
import {Observable} from 'rxjs';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {WorkplaceElementModel} from '../../../../../models/workplacemodels/workplaceelement.model';
import {AddWorkplaceElement} from '../../../../../store/workplace-element';

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

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    if (this.data?.object) {
      this.element = this.data.object;
      this.tasks = [...this.element?.tasks];
      this.labels = [...this.element.assignedLabels];
    }
  }

  createCheckList(form: NgForm): void {
    const checklist = {
      ...form.value,
      labels: this.labels,
      tasks: this.tasks
    };
    this.addChecklist(checklist);
  }

  ////////////////////////////////// TASKS ACTIONS ///////////////////////////////////////
  addTask(): void {
    this.tasks.push(new TaskModel('', [], false));
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  changeTask(model: {task: TaskModel, index: number}): void  {
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
