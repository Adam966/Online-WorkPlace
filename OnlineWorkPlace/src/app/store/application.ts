import {Action, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';

export class SetApplicationState {
  static readonly type = '[Application] GetApplicationState';
  constructor(public application: boolean) {}
}

export class ApplicationModel {
  isLoading?: boolean;
  changeToolbar?: boolean;
}

@State<boolean> ({
  name: 'application',
  defaults: false
})
@Injectable()
export class ApplicationState {
  @Action(SetApplicationState)
  getApplicationState(ctx: StateContext<boolean>, action: boolean): void {
    ctx.patchState(action);
  }
}
