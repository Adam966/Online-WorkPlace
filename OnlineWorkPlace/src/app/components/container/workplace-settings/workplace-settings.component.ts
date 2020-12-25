import { Component, OnInit } from '@angular/core';
import {WorkplaceSettingsState} from '../../../store/workplace-settings';
import {Select} from '@ngxs/store';
import {User} from '../../../models/application-models/user.model';
import {LabelModel} from '../../../models/label.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-workplace-settings',
  templateUrl: './workplace-settings.component.html',
  styleUrls: ['./workplace-settings.component.css']
})
export class WorkplaceSettingsComponent implements OnInit {
  @Select(WorkplaceSettingsState.users)
  users$!: Observable<User[]>;

  @Select(WorkplaceSettingsState.labels)
  labels$!: Observable<LabelModel[]>;

  constructor() { }

  ngOnInit(): void {
  }
}