import {Action, State, StateContext} from '@ngxs/store';
import {WorkplaceModel} from '../models/workplace.model';
import {Injectable} from '@angular/core';
import {WorkplaceServiceApi} from '../services/workplace-api/workplace-service-api.service';

export class SaveWorkplaces {
  static readonly type = '[Main Component] SaveWorkplaces';
  constructor(public workplaces: WorkplaceModel[]) {}
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
  @Action(SaveWorkplaces)
  saveWorkplaces(ctx: StateContext<WorkplaceModel[]>, action: SaveWorkplaces): void {
    ctx.setState(action.workplaces);
  }

  @Action(AddWorkplace)
  addWorkplace(ctx: StateContext<WorkplaceModel[]>, action: AddWorkplace): void {
    ctx.setState([...ctx.getState(), action.workplace]);
  }
}
