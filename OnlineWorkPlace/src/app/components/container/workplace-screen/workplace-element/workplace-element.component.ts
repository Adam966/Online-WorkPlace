import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {WorkplaceElementModel} from '../../../../models/workplacemodels/workplaceelement.model';
import {ChecklistModel} from '../../../../models/workplacemodels/checklist.model';
import {LabelModel} from '../../../../models/application-models/label.model';
import {UserModel} from '../../../../models/application-models/user.model';

@Component({
  selector: 'app-workplace-element',
  templateUrl: './workplace-element.component.html',
  styleUrls: ['./workplace-element.component.css']
})
export class WorkplaceElementComponent implements OnInit, AfterViewInit {
  @Input()
  element: WorkplaceElementModel;

  @Input()
  colorOfElement: string;

  task = false;
  taskInfo: string;
  isCompleted: boolean;

  assignedLabels: LabelModel[];
  assignedUsers: UserModel[];

  constructor(private changes: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.assignedUsers = this.element.assignedUsers;
    this.assignedLabels = this.element.assignedLabels;

    if (this.element.type === 'checklist') {
      this.task = true;
      this.checkTask(this.element as ChecklistModel);
    }
  }

  checkTask(checklistModel: ChecklistModel): void {
    const completed = checklistModel.taskEntities.filter(item => item.completed).length;
    const allTasks = checklistModel.taskEntities.length;

    this.isCompleted = completed === allTasks;
    this.taskInfo = `${completed}\\${allTasks}`;
  }

  ngAfterViewInit(): void {
    this.changes.detectChanges();
  }
}
