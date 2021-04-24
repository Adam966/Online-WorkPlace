import {Component, OnInit} from '@angular/core';
import {DeleteWorkplaceLabel, DeleteWorkplaceUser, WorkplaceSettingsState} from '../../../store/workplace-settings';
import {Select} from '@ngxs/store';
import {UserModel} from '../../../models/application-models/user.model';
import {LabelModel} from '../../../models/application-models/label.model';
import {Observable} from 'rxjs';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {ApplicationState, SetApplicationToolbarTitle} from '../../../store/application';
import {WorkplaceSettingsApiService} from '../../../services/workplace-settings-api/workplace-settings-api.service';
import {UtilsMessage} from '../../../shared/utils/utils-message';
import {UserRightModel} from '../../../models/rights-model/user-right.model';
import {NotificationRightsModel} from '../../../models/rights-model/notification-rights.model';
import {LoginState} from '../../../store/login';
import {mergeMap} from 'rxjs/operators';

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

  @Select(ApplicationState.currentWorkplaceId)
  workplaceId$: Observable<number>;
  workplaceId: number;

  @Select(WorkplaceSettingsState.notificationsRights)
  notificationsRights$: Observable<NotificationRightsModel>;

  @Select(WorkplaceSettingsState.userRights)
  userRights$: Observable<UserRightModel>;
  notificationChanged = false;

  @Select(LoginState.userId)
  userId$!: Observable<number>;
  userId: number;

  notificationRights: any = {};

  constructor(private workplaceSettingService: WorkplaceSettingsApiService) {
  }

  ngOnInit(): void {
    this.workplaceId$.subscribe(id => this.workplaceId = id);
    this.userId$.subscribe(id => this.userId = id);
  }

  @Dispatch()
  setApplicationTitle(): SetApplicationToolbarTitle {
    return new SetApplicationToolbarTitle('Workplace Settings');
  }

  deleteLabel(label: LabelModel): void {
    this.workplaceSettingService.deleteWorkplaceLabel(this.workplaceId, label.id)
      .subscribe(_ => {
        this.deleteLabelState(label);
        UtilsMessage.showMessage(UtilsMessage.MESSAGE_LABEL_REMOVED, UtilsMessage.MESSAGE_STATUS_POSITIVE);
      });

  }

  deleteUser(user: UserModel): void {
    this.workplaceSettingService.deleteWorkplaceUser(this.workplaceId, user.id)
      .subscribe(_ => {
        this.deleteUserState(user);
        UtilsMessage.showMessage(UtilsMessage.MESSAGE_USER_REMOVED, UtilsMessage.MESSAGE_STATUS_POSITIVE);
      });
  }

  @Dispatch()
  deleteLabelState(label: LabelModel): DeleteWorkplaceLabel {
    return new DeleteWorkplaceLabel(label);
  }

  @Dispatch()
  deleteUserState(user: UserModel): DeleteWorkplaceUser {
    return new DeleteWorkplaceUser(user);
  }

  notificationSettingsChange(obj: any): void {
    this.notificationRights = {...this.notificationRights, ...obj};
    this.notificationChanged = true;
  }

  changeNotificationSettings(): void {
    console.log(this.notificationRights);
    this.notificationsRights$
      .pipe(
        mergeMap(notificationsRight => {
          this.notificationRights = {id: notificationsRight.id, ...this.notificationRights};
          return this.workplaceSettingService.changeUserNotifications(this.workplaceId.toString(), this.userId.toString(), this.notificationRights);
        })
      ).subscribe();
  }
}
