import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {WorkplaceSettingsApiService} from '../services/workplace-settings-api/workplace-settings-api.service';
import {UserModel} from '../models/user.model';
import {LabelModel} from '../models/label.model';

export class GetWorkplaceUsers {
  static readonly type = '[WorkPlace Settings] GetWorkplaceUsers';
  constructor(public workplaceId: number) {}
}

export class GetWorkplaceLabels {
  static readonly type = '[WorkPlace Settings] GetWorkplaceLabels';
  constructor(public workplaceId: number) {}
}

@State<{ users: UserModel[], labels: LabelModel[] }> ({
  name: 'workplaceSettings',
  defaults: {
    users: [],
    labels: []
  }
})
@Injectable()
export class WorkplaceSettingsState {
  constructor(private workplaceSettingsService: WorkplaceSettingsApiService) {}

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
}
