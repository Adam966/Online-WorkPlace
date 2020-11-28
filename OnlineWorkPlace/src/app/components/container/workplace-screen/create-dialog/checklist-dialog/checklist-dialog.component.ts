import {Component, Inject, OnInit} from '@angular/core';
import {TaskModel} from '../../../../../models/workplacemodels/task.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChecklistModel} from '../../../../../models/workplacemodels/checklist.model';
import {Select, Store} from '@ngxs/store';
import {NgForm} from '@angular/forms';
import {User} from '../../../../../models/user.model';
import {LabelModel} from '../../../../../models/label.model';
import {WorkplaceSettingsState} from '../../../../../store/workplace-settings';
import {Observable} from 'rxjs';

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
      this.tasks = this.element.tasks;
    }
  }

  addTask(): void {
    this.tasks.push();
  }

  createCheckList(form: NgForm): void {

  }

  ////////////////////////////////// ELEMENT ACTIONS ///////////////////////////////////////
  addElement(element: LabelModel): void {
    this.labels.push(element);
  }

  removeElement(element: User | LabelModel, i: number): void {
      this.labels.splice(i, 1);
  }

  notificationDateFilter(date: Date | null): boolean {
    return date?.getTime() > Date.now();
  }
}
