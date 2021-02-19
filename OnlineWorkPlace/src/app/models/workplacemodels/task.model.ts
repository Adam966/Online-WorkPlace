import {UserModel} from '../application-models/user.model';

export interface TaskModel {
  id?: number;
  assignedUsers: UserModel[];
  description: string;
  completed: boolean;
}
