import {Component, Input, OnInit} from '@angular/core';
import {WorkplaceElementModel} from '../../../../models/workplacemodels/workplaceelement.model';
import {ChecklistModel} from '../../../../models/workplacemodels/checklist.model';
import {LabelModel} from '../../../../models/label.model';
import {User} from '../../../../models/application-models/user.model';

@Component({
  selector: 'app-workplace-element',
  templateUrl: './workplace-element.component.html',
  styleUrls: ['./workplace-element.component.css']
})
export class WorkplaceElementComponent implements OnInit {
  @Input()
  element: WorkplaceElementModel;

  @Input()
  colorOfElement: string;

  task = false;
  taskInfo: string;
  isCompleted: boolean;

  assignedLabels: LabelModel[];
  assignedUsers: User[];


  constructor() { }

  ngOnInit(): void {
    this.assignedUsers = this.element.assignedUsers ?? [];
    this.assignedLabels = this.element.assignedLabels ?? [];

    if (this.element.hasOwnProperty('tasks')) {
      this.task = true;
      this.checkTask(this.element as ChecklistModel);
    }
  }

  checkTask(checklistModel: ChecklistModel): void {
    const completed = checklistModel.tasks.filter(item => item.isCompleted).length;
    const allTasks = checklistModel.tasks.length;

    this.isCompleted = completed === allTasks;
    this.taskInfo = `${completed}\\${allTasks}`;
  }
}
