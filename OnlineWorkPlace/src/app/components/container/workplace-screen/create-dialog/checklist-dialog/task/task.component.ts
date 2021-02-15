import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TaskModel} from '../../../../../../models/workplacemodels/task.model';
import {UserModel} from '../../../../../../models/application-models/user.model';
import {Select} from '@ngxs/store';
import {WorkplaceSettingsState} from '../../../../../../store/workplace-settings';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @ViewChild('description')
  descriptionInput: HTMLInputElement;

  @ViewChild('form')
  form: NgForm;

  @Input()
  index: number;

  @Input()
  task: TaskModel;

  @Output()
  removeTaskEmitter = new EventEmitter<number>();

  @Output()
  taskChangedEmitter = new EventEmitter<{task: TaskModel, index: number}>();

  users: UserModel[] = [];
  descriptionChanged = false;
  userLength: number;

  @Select(WorkplaceSettingsState.users)
  users$: Observable<UserModel[]>;

  constructor() { }

  ngOnInit(): void {
    this.users = [...this.task?.assignedUsers];
    this.userLength = this.users.length;
  }

  removeTask(): void {
    this.removeTaskEmitter.emit(this.index);
  }

  changeTask(): void {
    const task = {
      ...this.form.value,
      assignedUsers: this.users
    };
    this.taskChangedEmitter.emit({
      task, index: this.index
    });
    this.descriptionChanged = false;
    this.userLength = this.users.length;
  }

  inputChanged(): void {
    this.descriptionChanged = true;
  }

  //////////////////////////////// HANDLE USER LABEL /////////////////////////////////////
  addUser(user: UserModel): void {
    const temp = this.users.filter(data => data.photo == user.photo);
    if (temp.length !== 1) {
      this.users.push(user);
    }
  }

  removeUser(index: number): void {
    this.users.splice(index, 1);
  }
}
