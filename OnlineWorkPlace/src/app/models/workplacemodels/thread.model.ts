import {WorkplaceElementModel} from './workplaceelement.model';
import {LabelModel} from '../application-models/label.model';
import {User, UserModel} from '../application-models/user.model';

export interface ThreadModel extends WorkplaceElementModel {
  name: string;
  description: string;
}
