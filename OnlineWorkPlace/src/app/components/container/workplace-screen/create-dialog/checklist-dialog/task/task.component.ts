import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskModel} from '../../../../../../models/workplacemodels/task.model';
import {User} from '../../../../../../models/application-models/user.model';
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

  @Output()
  removeTaskEmitter = new EventEmitter<number>();

  users: User[] = [];

  @Select(WorkplaceSettingsState.users)
  users$: Observable<User[]>;

  constructor() { }

  ngOnInit(): void {
    this.users = [...this.task?.assignedUsers];
  }

  removeTask(): void {
    this.removeTaskEmitter.emit(this.index);
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}
