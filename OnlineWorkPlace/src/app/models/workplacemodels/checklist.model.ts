import {WorkplaceElementModel} from './workplaceelement.model';
import {TaskModel} from './task.model';

export class ChecklistModel implements WorkplaceElementModel{
  constructor(name: string, tasks: TaskModel[], backGroundColor?: string, id?: number) {
    this.backGroundColor = backGroundColor;
    this.id = id;
    this.name = name;
    this.tasks = tasks;
  }

  backGroundColor: string;
  id?: number;
  name: string;
  tasks: TaskModel[];
}
