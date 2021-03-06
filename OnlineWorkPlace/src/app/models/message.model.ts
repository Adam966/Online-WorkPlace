import {UserModel} from './application-models/user.model';

export interface MessageModel {
  description: string;
  timestamp: string;
  senderUser: UserModel;
}
