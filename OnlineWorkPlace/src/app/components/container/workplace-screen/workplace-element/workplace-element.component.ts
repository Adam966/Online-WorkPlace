import {Component, Input, OnInit} from '@angular/core';
import {WorkplaceElementModel} from '../../../../models/workplacemodels/workplaceelement.model';
import {ChecklistModel} from '../../../../models/workplacemodels/checklist.model';
import {WorkplaceElementApiService} from '../../../../services/workplace-element-api/workplace-element-api.service';
import {WorkplaceSettingsState} from '../../../../store/workplace-settings';
import {UserModel} from '../../../../models/user.model';
import {Select} from '@ngxs/store';
import {LabelModel} from '../../../../models/label.model';

@Component({
  selector: 'app-workplace-element',
  templateUrl: './workplace-element.component.html',
  styleUrls: ['./workplace-element.component.css']
})
export class WorkplaceElementComponent implements OnInit {
  @Input()
  element: WorkplaceElementModel;

  @Select(WorkplaceSettingsState.users)
  users$: UserModel[];

  @Select(WorkplaceSettingsState.labels)
  labels$: LabelModel[];

  task = false;
  taskInfo: string;

  constructor(private workplaceElementService: WorkplaceElementApiService) { }

  ngOnInit(): void {
    if (this.element.hasOwnProperty('tasks')) {
      this.task = true;
      this.checkTask(this.element as ChecklistModel);
    }
    if (this.element.hasOwnProperty('dueDate')) {
    }
  }

  checkTask(checklistModel: ChecklistModel): void {
    this.taskInfo = `${checklistModel.tasks.filter(item => item.isCompleted === 1).length}\\${checklistModel.tasks.length}`;
  }
}
