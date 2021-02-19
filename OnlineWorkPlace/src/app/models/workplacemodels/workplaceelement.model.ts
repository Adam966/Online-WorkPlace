import {UserModel} from '../application-models/user.model';
import {LabelModel} from '../application-models/label.model';

export interface WorkplaceElementModel {
  id?: number;
  type?: string;
  name: string;
  isArchived?: boolean;
  creationTime?: Date;
  assignedLabels: LabelModel[];
  assignedUsers: UserModel[];
}
