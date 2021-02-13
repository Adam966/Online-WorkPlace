import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../../../models/application-models/user.model';
import {WorkplaceSettingsApiService} from '../../../../../services/workplace-settings-api/workplace-settings-api.service';
import {Select} from '@ngxs/store';
import {ApplicationState} from '../../../../../store/application';
import {Observable} from 'rxjs';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {AddWorkplaceUser} from '../../../../../store/workplace-settings';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  foundUsers: UserModel[];
  chosenUser: UserModel;

  @Select(ApplicationState.currentWorkplaceId)
  workplaceId$: Observable<string>;
  workplaceId: string;
  isLoading = false;
  constructor(private workplaceSettingsService: WorkplaceSettingsApiService) { }

  ngOnInit(): void {
    this.workplaceId$.subscribe(data => this.workplaceId = data);
  }

  create(): void {
    this.workplaceSettingsService.addWorkplaceUser(this.chosenUser.id.toString(), this.workplaceId)
      .subscribe(_ => {
        this.addUserToWorkplace();
      });
  }

  getUsersByEmail(email: string): void {
    if (email.length >= 4) {
      this.isLoading = true;
      this.workplaceSettingsService.findUsersByEmail(email)
        .subscribe(users => {
          this.isLoading = false;
          this.foundUsers = users;
        });
    }
  }

  chooseUser(user: UserModel): void {
    this.chosenUser = user;
  }

  @Dispatch()
  addUserToWorkplace(): AddWorkplaceUser {
    return new AddWorkplaceUser(this.chosenUser);
  }
}
