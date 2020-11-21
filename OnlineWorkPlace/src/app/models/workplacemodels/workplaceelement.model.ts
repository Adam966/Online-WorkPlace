import {UserModel} from '../user.model';
import {LabelModel} from '../label.model';

export interface WorkplaceElementModel {
  id?: number;
  name: string;
  backGroundColor?: string;
  assignedUsers: UserModel[];
  assignedLabels: LabelModel[];
}
