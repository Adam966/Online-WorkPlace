import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../../../models/application-models/user.model';
import {WorkplaceSettingsApiService} from '../../../../../services/workplace-settings-api/workplace-settings-api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  foundUsers: UserModel[];

  constructor(private workplaceSettingsService: WorkplaceSettingsApiService) { }

  ngOnInit(): void {
  }

  create(user: UserModel): void {
    this.workplaceSettingsService.addWorkplaceUser(1, user.id);
  }
}
