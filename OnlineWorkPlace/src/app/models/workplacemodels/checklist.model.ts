import {WorkplaceElementModel} from './workplaceelement.model';
import {TaskModel} from './task.model';
import {User} from '../application-models/user.model';
import {LabelModel} from '../label.model';

export class ChecklistModel implements WorkplaceElementModel{
  constructor(name: string,
              tasks: TaskModel[],
              assignedLabels: LabelModel[],
              assignedUsers: User[],
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
  assignedUsers: User[];
}
