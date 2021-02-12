import { Component, OnInit } from '@angular/core';
import {WorkplaceSettingsState} from '../../../store/workplace-settings';
import {Select} from '@ngxs/store';
import {UserModel} from '../../../models/application-models/user.model';
import {LabelModel} from '../../../models/label.model';
import {Observable} from 'rxjs';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SetApplicationToolbarTitle} from '../../../store/application';

@Component({
  selector: 'app-workplace-settings',
  templateUrl: './workplace-settings.component.html',
  styleUrls: ['./workplace-settings.component.css']
})
export class WorkplaceSettingsComponent implements OnInit {
  @Select(WorkplaceSettingsState.users)
  users$!: Observable<UserModel[]>;

  @Select(WorkplaceSettingsState.labels)
  labels$!: Observable<LabelModel[]>;

/*
  @Select(LoginState.userId)
  userId$: Observable<number>;
  userId: number;
*/

  constructor() { }

  ngOnInit(): void {
    // this.userId$.subscribe(data => this.userId = data);
  }

  @Dispatch()
  setApplicationTitle(): SetApplicationToolbarTitle {
    return new SetApplicationToolbarTitle('Workplace Settings');
  }

  deleteLabel(label: LabelModel): void {

  }

  deleteUser(user: UserModel): void {

  }
}
