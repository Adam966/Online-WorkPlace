import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from '../../../../../../models/workplacemodels/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input()
  index: number;

  @Input()
  task: TaskModel;

  images: string[] = ['string', 'string'];

  constructor() { }

  ngOnInit(): void {
  }

  removeTask(): void {
    // push event remove from array i
  }
}
