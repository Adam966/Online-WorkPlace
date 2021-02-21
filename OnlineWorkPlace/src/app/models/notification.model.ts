import {UserModel} from './application-models/user.model';

export interface NotificationModel {
   id: number;
   type: NotificationType;
   description: string;
   fresh: boolean;
   creationTime: Date;
   senderUser: UserModel;
}

enum NotificationType {
  GENERAL_INFO, USER_ADDED_TO_ELEMENT, MESSAGE_SENT_TO_USER, DUE_DATE
}

