import {User} from '../application-models/user.model';
import {LabelModel} from '../label.model';

export interface WorkplaceElementModel {
  id?: number;
  name: string;
  assignedLabels: LabelModel[];
  assignedUsers: User[];
}
