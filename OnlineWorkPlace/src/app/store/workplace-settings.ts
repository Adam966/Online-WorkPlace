import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {WorkplaceSettingsApiService} from '../services/workplace-settings-api/workplace-settings-api.service';
import {UserModel} from '../models/application-models/user.model';
import {LabelModel} from '../models/application-models/label.model';

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

@State<{ users: UserModel[], labels: LabelModel[] }>({
  name: 'workplaceSettings',
  defaults: {
    users: [],
    labels: []
  }
})
@Injectable()
export class WorkplaceSettingsState {
  constructor(private workplaceSettingsService: WorkplaceSettingsApiService) {
  }

  @Selector()
  static users(currentState: { users: UserModel[], labels: LabelModel[] }): UserModel[] {
    return currentState.users;
  }

  @Selector()
  static labels(currentState: { users: UserModel[], labels: LabelModel[] }): LabelModel[] {
    return currentState.labels;
  }

  @Action(GetWorkplaceUsers)
  getWorkplaceUsers(ctx: StateContext<{ users: UserModel[], labels: LabelModel[] }>, action: GetWorkplaceUsers): void {
    this.workplaceSettingsService.getWorkplaceUsers(action.workplaceId)
      .subscribe(data => {
        const state = ctx.getState();
        ctx.setState({users: data, labels: state.labels});
      });
  }

  @Action(GetWorkplaceLabels)
  getWorkplaceLabels(ctx: StateContext<{ users: UserModel[], labels: LabelModel[] }>, action: GetWorkplaceLabels): void {
    this.workplaceSettingsService.getWorkplaceLabels(action.workplaceId)
      .subscribe(data => {
        const state = ctx.getState();
        ctx.setState({users: state.users, labels: data});
      });
  }

  @Action(AddWorkplaceLabel)
  addWorkplaceLabel(ctx: StateContext<{ users: UserModel[], labels: LabelModel[] }>, action: AddWorkplaceLabel): void {
    const state = ctx.getState();
    ctx.setState({users: state.users, labels: [...state.labels, action.label]});
  }

  @Action(AddWorkplaceUser)
  addWorkplaceUser(ctx: StateContext<{ users: UserModel[], labels: LabelModel[] }>, action: AddWorkplaceUser): void {
    const state = ctx.getState();
    ctx.setState({labels: state.labels, users: [...state.users, action.user]});
  }

  @Action(DeleteWorkplaceLabel)
  deleteWorkplaceLabel(ctx: StateContext<{ users: UserModel[], labels: LabelModel[] }>, action: DeleteWorkplaceLabel): void {
    const state = ctx.getState();
    const index = state.labels.indexOf(action.label);
    const array = [...state.labels];
    array.splice(index, 1);
    ctx.setState({ users: state.users, labels: array});
  }

  @Action(DeleteWorkplaceUser)
  deleteWorkplaceUser(ctx: StateContext<{ users: UserModel[], labels: LabelModel[] }>, action: DeleteWorkplaceUser): void {
    const state = ctx.getState();
    const index = state.users.indexOf(action.user);
    const array = [...state.users];
    array.splice(index, 1);
    ctx.setState({ users: array, labels: state.labels});
  }
}
