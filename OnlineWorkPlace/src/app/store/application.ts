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

export class SetApplicationWorkplace {
  static readonly type = '[Application] WorkplaceId';
  constructor(public payload: string) {}
}

export class ApplicationModel {
  isLoading?: boolean;
  changeToolbar?: boolean;
  title?: string;
  currentWorkplaceId: string;
}

@State<ApplicationModel> ({
  name: 'application',
  defaults: {
    isLoading: null,
    changeToolbar: null,
    title: null,
    currentWorkplaceId: null
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

  @Selector()
  static currentWorkplaceId(state: ApplicationModel): string {
    return state.currentWorkplaceId;
  }

  @Action(SetApplicationLoadingState)
  setLoadingStatus(ctx: StateContext<ApplicationModel>, action: SetApplicationLoadingState): void {
    ctx.setState({
      ...ctx.getState(),
      isLoading: action.payload
    });
  }

  @Action(SetApplicationToolbarState)
  setToolbarState(ctx: StateContext<ApplicationModel>, action: SetApplicationToolbarState): void {
    ctx.setState({
      ...ctx.getState(),
      changeToolbar: action.payload
    });
  }

  @Action(SetApplicationToolbarTitle)
  setToolbarTitle(ctx: StateContext<ApplicationModel>, action: SetApplicationToolbarTitle): void {
    ctx.setState({
      ...ctx.getState(),
      title: action.payload
    });
  }

  @Action(SetApplicationWorkplace)
  setApplicationWorkplaceId(ctx: StateContext<ApplicationModel>, action: SetApplicationWorkplace): void {
    console.log(action);
    ctx.setState({
      ...ctx.getState(),
      currentWorkplaceId: action.payload
    });
  }
}
