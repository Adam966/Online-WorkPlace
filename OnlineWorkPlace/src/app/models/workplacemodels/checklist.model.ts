import {WorkplaceElementModel} from './workplaceelement.model';
import {TaskModel} from './task.model';
import {User} from '../user.model';
import {LabelModel} from '../label.model';

export class ChecklistModel implements WorkplaceElementModel{
  constructor(name: string,
              tasks: TaskModel[],
              assignedLabels: LabelModel[],
              assignedUsers: User[],
              backGroundColor?: string,
              id?: number)
  {
    this.id = id;
    this.name = name;
    this.tasks = tasks;
    this.assignedLabels = assignedLabels;
    this.assignedUsers = assignedUsers;
  }

  id?: number;
  name: string;
  tasks: TaskModel[];
  assignedLabels: LabelModel[];
  assignedUsers: User[];
}
