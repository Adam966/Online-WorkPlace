import {Component, Input, OnInit} from '@angular/core';
import {WorkplaceElementModel} from '../../../../models/workplacemodels/workplaceelement.model';
import {ChecklistModel} from '../../../../models/workplacemodels/checklist.model';
import {WorkplaceElementApiService} from '../../../../services/workplace-element-api/workplace-element-api.service';

@Component({
  selector: 'app-workplace-element',
  templateUrl: './workplace-element.component.html',
  styleUrls: ['./workplace-element.component.css']
})
export class WorkplaceElementComponent implements OnInit {
  @Input()
  element: WorkplaceElementModel;

  images: string[] = ['img', 'img', 'img'];
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

/*    for (let i = 0; i < 3; i++) {
      this.workplaceElementService.getUserPhoto(1)
        .subscribe((data) => {
          data.photo = 'data:image/jpeg;base64,' + data.photo;
          this.images.push(data.photo);
        });
    }*/
  }

  checkTask(checklistModel: ChecklistModel): void {
    this.taskInfo = `${checklistModel.tasks.filter(item => item.isCompleted === 1).length}\\${checklistModel.tasks.length}`;
  }
}
