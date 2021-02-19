import {WorkplaceElementModel} from './workplaceelement.model';
import {TaskModel} from './task.model';
import {LabelModel} from '../application-models/label.model';

export interface ChecklistModel extends WorkplaceElementModel{
  id?: number;
  name: string;
  taskEntities: TaskModel[];
  dueDate?: Date;
  assignedLabels: LabelModel[];
}
