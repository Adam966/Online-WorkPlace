import {WorkplaceElementModel} from './workplaceelement.model';
import {TaskModel} from './task.model';

export class ChecklistModel implements WorkplaceElementModel{
  backGroundColor: string;
  id: number;
  name: string;
  tasks: TaskModel[];
}
