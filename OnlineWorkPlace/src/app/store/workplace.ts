import {Action, State, StateContext} from '@ngxs/store';
import {WorkplaceModel} from '../models/workplace.model';
import {Injectable} from '@angular/core';

export class Workplace {
  static readonly type = '[Main Component] Login';
  constructor() {
  }
}

@State<WorkplaceModel> ({
  name: 'workplaces',
  defaults: { id: null, name: null, description: null, AdminUserId: null }
})
@Injectable()
export class WorkplaceState {
  @Action(Workplace)
  addWorkplaces(ctx: StateContext<WorkplaceModel>, action: Workplace): void {

  }
}
