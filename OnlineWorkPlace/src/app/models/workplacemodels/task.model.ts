import {UserModel} from '../application-models/user.model';

export class TaskModel {
  constructor(description: string, assignedUsers: UserModel[], isCompleted: boolean, id?: number) {
    this.id = id;
    this.description = description;
    this.isCompleted = isCompleted;
    this.assignedUsers = assignedUsers;
  }

  id?: number;
  assignedUsers: UserModel[];
  description: string;
  isCompleted: boolean;
}
