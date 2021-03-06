import {UserRightModel} from './user-right.model';
import {NotificationRightsModel} from './notification-rights.model';

export interface RightsModel {
  notificationsRights: NotificationRightsModel;
  userRights: UserRightModel;
}
