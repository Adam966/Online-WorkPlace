import {WorkplaceElementModel} from './workplaceelement.model';
import {TaskModel} from './task.model';
import {UserModel} from '../application-models/user.model';
import {LabelModel} from '../application-models/label.model';

export class ChecklistModel implements WorkplaceElementModel{
  constructor(name: string,
              tasks: TaskModel[],
              assignedLabels: LabelModel[],
              assignedUsers: UserModel[],
              dueDate?: Date,
              id?: number)
  {
    this.id = id;
    this.name = name;
    this.tasks = tasks;
    this.dueDate = dueDate;
  }

  id?: number;
  name: string;
  tasks: TaskModel[];
  dueDate?: Date;
  assignedLabels: LabelModel[];
  assignedUsers: UserModel[];
}
