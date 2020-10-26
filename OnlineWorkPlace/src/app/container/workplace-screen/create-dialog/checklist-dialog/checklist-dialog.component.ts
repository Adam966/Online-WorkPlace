import { Component, OnInit } from '@angular/core';
import {TaskModel} from '../../../../models/workplacemodels/task.model';

@Component({
  selector: 'app-checklist-dialog',
  templateUrl: './checklist-dialog.component.html',
  styleUrls: ['./checklist-dialog.component.css']
})
export class ChecklistDialogComponent implements OnInit {
  tasks: TaskModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addTask(): void {
    this.tasks.push(new TaskModel());
  }
}
