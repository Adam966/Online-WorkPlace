import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';

export class SetApplicationLoadingState {
  static readonly type = '[Application] LoadingState';
  constructor(public payload: boolean) {}
}

export class SetApplicationToolbarState {
  static readonly type = '[Application] ToolbarState';
  constructor(public payload: boolean) {}
}

export class ApplicationModel {
  isLoading?: boolean;
  changeToolbar?: boolean;
}

@State<ApplicationModel> ({
  name: 'application',
  defaults: {
    isLoading: null,
    changeToolbar: null
  }
})
@Injectable()
export class ApplicationState {
  @Selector()
  static toolbarState(state: ApplicationModel): boolean {
    return state.changeToolbar;
  }

  @Selector()
  static isLoading(state: ApplicationModel): boolean {
    return state.isLoading;
  }

  @Action(SetApplicationLoadingState)
  setLoadingStatus(ctx: StateContext<ApplicationModel>, payload: boolean): void {
    ctx.setState({
      isLoading: payload,
      changeToolbar: ctx.getState().changeToolbar
    });
  }

  @Action(SetApplicationToolbarState)
  setToolbarState(ctx: StateContext<ApplicationModel>, payload: boolean): void {
    ctx.setState({
      isLoading: ctx.getState().isLoading,
      changeToolbar: payload
    });
  }
}
