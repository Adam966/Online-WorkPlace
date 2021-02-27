import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {WorkplaceSettingsApiService} from '../services/workplace-settings-api/workplace-settings-api.service';
import {UserModel} from '../models/application-models/user.model';
import {LabelModel} from '../models/application-models/label.model';
import {NotificationRightsModel} from '../models/rights-model/notification-rights.model';
import {UserRightModel} from '../models/rights-model/user-right.model';

export class GetWorkplaceUsers {
  static readonly type = '[WorkPlace Settings] GetWorkplaceUsers';
  constructor(public workplaceId: number) {
  }
}

export class GetWorkplaceLabels {
  static readonly type = '[WorkPlace Settings] GetWorkplaceLabels';
  constructor(public workplaceId: number) {
  }
}

export class AddWorkplaceUser {
  static readonly type = '[WorkPlace Settings] AddWorkplaceUser';
  constructor(public user: UserModel) {
  }
}

export class AddWorkplaceLabel {
  static readonly type = '[WorkPlace Settings] AddWorkplaceLabel';
  constructor(public label: LabelModel) {
  }
}

export class DeleteWorkplaceLabel {
  static readonly type = '[WorkPlace Settings] DeleteWorkplaceLabel';
  constructor(public label: LabelModel) {
  }
}

export class DeleteWorkplaceUser {
  static readonly type = '[WorkPlace Settings] DeleteWorkplaceUser';
  constructor(public user: UserModel) {
  }
}

export class AddUserRights {
  static readonly type = '[WorkPlace Settings] AddUserRights';
  constructor(public userRights: UserRightModel) {
  }
}

export class AddNotificationRights {
  static readonly type = '[WorkPlace Settings] AddNotificationRights';
  constructor(public notificationRights: NotificationRightsModel) {
  }
}

export class GetRights {
  static readonly type = '[WorkPlace Settings] GetRights';
  constructor(public workplaceId: number, public userId: number) {
  }
}

interface WorkplaceSettings {
  notificationRights: NotificationRightsModel;
  userRights: UserRightModel;
  users: UserModel[];
  labels: LabelModel[];
}

@State<WorkplaceSettings>({
  name: 'workplaceSettings',
  defaults: {
    notificationRights: null,
    userRights: null,
    users: [],
    labels: []
  }
})
@Injectable()
export class WorkplaceSettingsState {
  constructor(private workplaceSettingsService: WorkplaceSettingsApiService) {
  }

  @Selector()
  static users(currentState: WorkplaceSettings): UserModel[] {
    return currentState.users;
  }

  @Selector()
  static labels(currentState: WorkplaceSettings): LabelModel[] {
    return currentState.labels;
  }

  @Selector()
  static notificationsRights(currentState: WorkplaceSettings): NotificationRightsModel {
    return currentState.notificationRights;
  }

  @Selector()
  static userRights(currentState: WorkplaceSettings): UserRightModel {
    return currentState.userRights;
  }

  @Action(GetWorkplaceUsers)
  getWorkplaceUsers(ctx: StateContext<WorkplaceSettings>, action: GetWorkplaceUsers): void {
    this.workplaceSettingsService.getWorkplaceUsers(action.workplaceId)
      .subscribe(data => {
        const state = ctx.getState();
        ctx.setState({users: data, ...state});
      });
  }

  @Action(GetWorkplaceLabels)
  getWorkplaceLabels(ctx: StateContext<WorkplaceSettings>, action: GetWorkplaceLabels): void {
    this.workplaceSettingsService.getWorkplaceLabels(action.workplaceId)
      .subscribe(data => {
        const state = ctx.getState();
        ctx.setState({...state, labels: data});
      });
  }

  @Action(AddWorkplaceLabel)
  addWorkplaceLabel(ctx: StateContext<WorkplaceSettings>, action: AddWorkplaceLabel): void {
    const state = ctx.getState();
    ctx.setState({...state, labels: [...state.labels, action.label]});
  }

  @Action(AddWorkplaceUser)
  addWorkplaceUser(ctx: StateContext<WorkplaceSettings>, action: AddWorkplaceUser): void {
    const state = ctx.getState();
    ctx.setState({...state, users: [...state.users, action.user]});
  }

  @Action(DeleteWorkplaceLabel)
  deleteWorkplaceLabel(ctx: StateContext<WorkplaceSettings>, action: DeleteWorkplaceLabel): void {
    const state = ctx.getState();
    const index = state.labels.indexOf(action.label);
    const array = [...state.labels];
    array.splice(index, 1);
    ctx.setState({...state, labels: array});
  }

  @Action(DeleteWorkplaceUser)
  deleteWorkplaceUser(ctx: StateContext<WorkplaceSettings>, action: DeleteWorkplaceUser): void {
    const state = ctx.getState();
    const index = state.users.indexOf(action.user);
    const array = [...state.users];
    array.splice(index, 1);
    ctx.setState({users: array, ...state});
  }

  @Action(AddNotificationRights)
  addNotificationRights(ctx: StateContext<WorkplaceSettings>, action: AddNotificationRights): void {
    ctx.setState({notificationRights: action.notificationRights, ...ctx.getState()});
  }

  @Action(AddUserRights)
  addUserRights(ctx: StateContext<WorkplaceSettings>, action: AddUserRights): void {
    ctx.setState({notificationRights: action.userRights, ...ctx.getState()});
  }

  @Action(GetRights)
  getRights(ctx: StateContext<WorkplaceSettings>, action: GetRights): void {
    this.workplaceSettingsService.getUserRights(action.workplaceId, action.userId)
      .subscribe(rights => {
        ctx.setState({...ctx.getState(), notificationRights: rights.notificationsRights, userRights: rights.userRights});
      });
  }
}
