import {WorkplaceElementModel} from './workplaceelement.model';
import {TaskModel} from './task.model';
import {UserModel} from '../user.model';
import {LabelModel} from '../label.model';

export class ChecklistModel implements WorkplaceElementModel{
  constructor(name: string, tasks: TaskModel[], assignedLabels: LabelModel[], assignedUsers: UserModel[], backGroundColor?: string, id?: number) {
    this.backGroundColor = backGroundColor;
    this.id = id;
    this.name = name;
    this.tasks = tasks;
    this.assignedLabels = assignedLabels;
    this.assignedUsers = assignedUsers;
  }

  backGroundColor: string;
  id?: number;
  name: string;
  tasks: TaskModel[];
  assignedLabels: LabelModel[];
  assignedUsers: UserModel[];
}
