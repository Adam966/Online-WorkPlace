import {WorkplaceElementModel} from './workplaceelement.model';
import {LabelModel} from '../label.model';
import {UserModel} from '../user.model';

export class NoteModel implements WorkplaceElementModel{
  constructor( name: string, description: string,  assignedLabels: LabelModel[], assignedUsers: UserModel[], backGroundColor?: string, dueDate?: Date, id?: number) {
    this.id = id;
    this.backGroundColor = backGroundColor;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.assignedLabels = assignedLabels;
    this.assignedUsers = assignedUsers;
  }

  id?: number;
  backGroundColor?: string;
  name: string;
  description: string;
  dueDate?: Date;
  assignedLabels: LabelModel[];
  assignedUsers: UserModel[];
}
