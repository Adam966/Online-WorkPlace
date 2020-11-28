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

  constructor() { }

  ngOnInit(): void {
    if (this.element.hasOwnProperty('tasks')) {
      this.task = true;
      this.checkTask(this.element as ChecklistModel);
    }
  }

  checkTask(checklistModel: ChecklistModel): void {
    this.taskInfo = `${checklistModel.tasks.filter(item => item.isCompleted).length}\\${checklistModel.tasks.length}`;
  }
}
