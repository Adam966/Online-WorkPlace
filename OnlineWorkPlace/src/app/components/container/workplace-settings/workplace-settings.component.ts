import { Component, OnInit } from '@angular/core';
import {DeleteWorkplaceLabel, DeleteWorkplaceUser, WorkplaceSettingsState} from '../../../store/workplace-settings';
import {Select} from '@ngxs/store';
import {UserModel} from '../../../models/application-models/user.model';
import {LabelModel} from '../../../models/application-models/label.model';
import {Observable} from 'rxjs';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {ApplicationState, SetApplicationToolbarTitle} from '../../../store/application';
import {WorkplaceSettingsApiService} from '../../../services/workplace-settings-api/workplace-settings-api.service';
import {UtilsMessage} from '../../../shared/utils/utils-message';

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

  constructor(private workplaceSettingService: WorkplaceSettingsApiService) { }

  ngOnInit(): void {
    this.workplaceId$.subscribe(id => this.workplaceId = id);
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
}
