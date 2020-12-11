import {User} from '../application-models/user.model';

export class TaskModel {
  constructor(description: string, assignedUsers: User[], isCompleted: boolean, id?: number, dueDate?: Date) {
    this.id = id;
    this.dueDate = dueDate;
    this.description = description;
    this.isCompleted = isCompleted;
    this.assignedUsers = assignedUsers;
  }

  id?: number;
  assignedUsers: User[];
  dueDate?: Date;
  description: string;
  isCompleted: boolean;
}
