import {Component, Input, OnInit} from '@angular/core';
import {WorkplaceElementModel} from '../../../models/workplacemodels/workplaceelement.model';
import {ChecklistModel} from '../../../models/workplacemodels/checklist.model';

@Component({
  selector: 'app-workplace-element',
  templateUrl: './workplace-element.component.html',
  styleUrls: ['./workplace-element.component.css']
})
export class WorkplaceElementComponent implements OnInit {
  @Input()
  element: WorkplaceElementModel;

  images: string[] = ['title', 'title', 'title'];
  task = false;
  taskInfo: string;

  constructor() { }

  ngOnInit(): void {
    if (this.element.hasOwnProperty('tasks')) {
      this.task = true;
      this.checkTask(this.element as unknown as ChecklistModel);
    }
    if (this.element.hasOwnProperty('dueDate')) {
    }
  }

  checkTask(checklistModel: ChecklistModel): void {
    this.taskInfo = `${checklistModel.tasks.filter(item => item.isCompleted === 1).length}\\${checklistModel.tasks.length}`;
  }
}
