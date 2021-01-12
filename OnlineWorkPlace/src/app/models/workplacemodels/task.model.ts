import {User} from '../application-models/user.model';

export class TaskModel {
  constructor(description: string, assignedUsers: User[], isCompleted: boolean, id?: number) {
    this.id = id;
    this.description = description;
    this.isCompleted = isCompleted;
    this.assignedUsers = assignedUsers;
  }

  id?: number;
  assignedUsers: User[];
  description: string;
  isCompleted: boolean;
}
