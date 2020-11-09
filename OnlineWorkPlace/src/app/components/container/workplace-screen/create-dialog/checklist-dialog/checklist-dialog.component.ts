import {Component, Inject, OnInit} from '@angular/core';
import {TaskModel} from '../../../../../models/workplacemodels/task.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChecklistModel} from '../../../../../models/workplacemodels/checklist.model';
import {Store} from '@ngxs/store';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-checklist-dialog',
  templateUrl: './checklist-dialog.component.html',
  styleUrls: ['./checklist-dialog.component.css']
})
export class ChecklistDialogComponent implements OnInit {
  tasks: TaskModel[] = [];
  element: ChecklistModel;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    if (this.data?.object) {
      this.element = this.data.object;
      this.tasks = this.element.tasks;
    }
  }

  addTask(): void {
    this.tasks.push(new TaskModel());
  }

  createCheckList(form: NgForm): void {
    console.log(form);
    // this.store.dispatch(new AddWorkplaceElement(new ChecklistModel()));
  }
}
