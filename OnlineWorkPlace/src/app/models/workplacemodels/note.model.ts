import {WorkplaceElementModel} from './workplaceelement.model';
import {LabelModel} from '../label.model';
import {User} from '../application-models/user.model';

export class NoteModel implements WorkplaceElementModel{
  constructor(
    name: string,
    description: string,
    assignedLabels: LabelModel[],
    assignedUsers: User[],
    dueDate?: Date,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.assignedLabels = assignedLabels;
    this.assignedUsers = assignedUsers;
  }

  id?: number;
  name: string;
  description: string;
  dueDate?: Date;
  assignedLabels: LabelModel[];
  assignedUsers: User[];
}
