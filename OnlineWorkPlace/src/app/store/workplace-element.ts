import {Action, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {WorkplaceElementModel} from '../models/workplacemodels/workplaceelement.model';
import {WorkplaceElementApiService} from '../container/workplace-screen/service/workplace-element-api.service';

export class GetWorkplacesElements {
  static readonly type = '[WorkPlace Component] GetWorkplaces';
  constructor(public workplaces: number) {}
}

export class AddWorkplaceElement {
  static readonly type = '[WorkPlace Component] AddWorkPlace';
  constructor(public workplaceElement: WorkplaceElementModel) {}
}

@State<WorkplaceElementModel[]> ({
  name: 'workplaceElements',
  defaults: []
})
@Injectable()
export class WorkplaceElementState {
  constructor(private workplaceElementService: WorkplaceElementApiService) {}

  @Action(GetWorkplacesElements)
  getWorkplaces(ctx: StateContext<WorkplaceElementModel[]>, action: number): void {
    this.workplaceElementService.getWorkPlaceElements(action)
      .subscribe(response => {
        ctx.setState(response);
      });
  }

  @Action(AddWorkplaceElement)
  addWorkplace(ctx: StateContext<WorkplaceElementModel[]>, action: AddWorkplaceElement): void {
    ctx.setState([...ctx.getState(), action.workplaceElement]);
  }
}
