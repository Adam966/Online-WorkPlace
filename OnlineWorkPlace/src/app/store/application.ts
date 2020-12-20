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

export class SetApplicationToolbarTitle {
  static readonly type = '[Application] ToolbarTitle';
  constructor(public payload: string) {}
}

export class ApplicationModel {
  isLoading?: boolean;
  changeToolbar?: boolean;
  title?: string;
}

@State<ApplicationModel> ({
  name: 'application',
  defaults: {
    isLoading: null,
    changeToolbar: null,
    title: ''
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

  @Selector()
  static toolbarTitle(state: ApplicationModel): string {
    return state.title;
  }

  @Action(SetApplicationLoadingState)
  setLoadingStatus(ctx: StateContext<ApplicationModel>, action: SetApplicationLoadingState): void {
    ctx.setState({
      isLoading: action.payload,
      changeToolbar: ctx.getState().changeToolbar,
      title: ctx.getState().title
    });
  }

  @Action(SetApplicationToolbarState)
  setToolbarState(ctx: StateContext<ApplicationModel>, action: SetApplicationToolbarState): void {
    ctx.setState({
      isLoading: ctx.getState().isLoading,
      changeToolbar: action.payload,
      title: ctx.getState().title
    });
  }

  @Action(SetApplicationToolbarState)
  setToolbarTitle(ctx: StateContext<ApplicationModel>, action: SetApplicationToolbarTitle): void {
    ctx.setState({
      isLoading: ctx.getState().isLoading,
      changeToolbar: ctx.getState().changeToolbar,
      title: action.payload
    });
  }
}
