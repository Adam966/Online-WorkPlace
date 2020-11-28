import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from '../../../../../../models/workplacemodels/task.model';
import {User} from '../../../../../../models/user.model';
import {Select} from '@ngxs/store';
import {WorkplaceSettingsState} from '../../../../../../store/workplace-settings';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input()
  index: number;

  @Input()
  task: TaskModel;

  users: User[] = [];

  @Select(WorkplaceSettingsState.users)
  users$: Observable<User[]>;

  constructor() { }

  ngOnInit(): void {
    this.users = [...this.task.assignedUsers];
  }

  removeTask(): void {
    // push event remove from array i
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}
