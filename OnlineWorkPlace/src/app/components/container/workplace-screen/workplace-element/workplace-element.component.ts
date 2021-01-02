import {Component, Input, OnInit} from '@angular/core';
import {WorkplaceElementModel} from '../../../../models/workplacemodels/workplaceelement.model';
import {ChecklistModel} from '../../../../models/workplacemodels/checklist.model';

@Component({
  selector: 'app-workplace-element',
  templateUrl: './workplace-element.component.html',
  styleUrls: ['./workplace-element.component.css']
})
export class WorkplaceElementComponent implements OnInit {
  @Input()
  element: WorkplaceElementModel;

  task = false;
  taskInfo: string;
  isCompleted: boolean;

  constructor() { }

  ngOnInit(): void {
    if (this.element.hasOwnProperty('tasks')) {
      this.task = true;
      this.checkTask(this.element as ChecklistModel);
    }
  }

  checkTask(checklistModel: ChecklistModel): void {
    const completed = checklistModel.tasks.filter(item => item.isCompleted).length;
    const allTasks = checklistModel.tasks.length;

    if (completed === allTasks) {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
    }
    this.taskInfo = `${completed}\\${allTasks}`;
  }
}
