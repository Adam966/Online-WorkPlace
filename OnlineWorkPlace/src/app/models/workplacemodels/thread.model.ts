import {WorkplaceElementModel} from './workplaceelement.model';
import {LabelModel} from '../label.model';
import {User} from '../user.model';

export class ThreadModel implements WorkplaceElementModel {

  constructor(
    name: string,
    description: string,
    assignedLabels: LabelModel[],
    assignedUsers: User[],
    backGroundColor?: string,
    id?: number
  ) {
    this.backGroundColor = backGroundColor;
    this.id = id;
    this.name = name;
    this.description = description;
    this.assignedLabels = assignedLabels;
    this.assignedUsers = assignedUsers;
  }

  backGroundColor: string;
  id?: number;
  name: string;
  description: string;
  assignedLabels: LabelModel[];
  assignedUsers: User[];
}
