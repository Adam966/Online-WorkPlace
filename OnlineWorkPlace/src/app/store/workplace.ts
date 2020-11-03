import {Action, State, StateContext, Store} from '@ngxs/store';
import {WorkplaceModel} from '../models/workplace.model';
import {Injectable} from '@angular/core';
import {WorkplaceService} from '../container/main-screen/workplace/service/workplace.service';
import {SetApplicationState} from './application';

export class GetWorkplaces {
  static readonly type = '[Main Component] GetWorkplaces';
  constructor(public workplaces: number) {}
}

export class AddWorkplace {
  static readonly type = '[Main Component] AddWorkPlace';
  constructor(public workplace: WorkplaceModel) {}
}

@State<WorkplaceModel[]> ({
  name: 'workplaces',
  defaults: []
})
@Injectable()
export class WorkplaceState {
  constructor(private workplaceService: WorkplaceService, private store: Store) {}

  @Action(GetWorkplaces)
  getWorkplaces(ctx: StateContext<WorkplaceModel[]>, action: number): void {
    this.workplaceService.getAllWorkplaces(action)
      .subscribe(response => {
        ctx.setState(response);
      });
  }

  @Action(AddWorkplace)
  addWorkplace(ctx: StateContext<WorkplaceModel[]>, action: AddWorkplace): void {
    this.workplaceService.addWorkplace(action.workplace);
    ctx.setState([...ctx.getState(), action.workplace]);
  }
}
