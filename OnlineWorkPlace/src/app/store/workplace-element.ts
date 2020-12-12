import {Action, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {WorkplaceElementModel} from '../models/workplacemodels/workplaceelement.model';

export class SaveWorkplacesElements {
  static readonly type = '[WorkPlace Component] GetWorkplaceElements';
  constructor(public workplaces: WorkplaceElementModel[]) {}
}

export class AddWorkplaceElement {
  static readonly type = '[WorkPlace Component] AddWorkplaceElement';
  constructor(public workplaceElement: WorkplaceElementModel, public index?: number) {}
}

export class DeleteWorkplaceElement {
  static readonly type = '[WorkPlace Component] DeleteWorkplaceElement';
  constructor(public index: number) {}
}

@State<WorkplaceElementModel[]> ({
  name: 'workplaceElements',
  defaults: []
})
@Injectable()
export class WorkplaceElementState {
  constructor() {}

  @Action(SaveWorkplacesElements)
  saveWorkplaces(ctx: StateContext<WorkplaceElementModel[]>, action: SaveWorkplacesElements): void {
    ctx.setState(action.workplaces);
  }

  @Action(AddWorkplaceElement)
  addWorkplace(ctx: StateContext<WorkplaceElementModel[]>, action: AddWorkplaceElement): void {
    if (action.index || action.index === 0) {
      const temp = [...ctx.getState()];
      temp.splice(action.index, 1, action.workplaceElement);
      ctx.setState(temp);
    } else {
      ctx.setState([...ctx.getState(), action.workplaceElement]);
    }
  }

  @Action(DeleteWorkplaceElement)
  deleteWorkplace(ctx: StateContext<WorkplaceElementModel[]>, action: DeleteWorkplaceElement): void {
    const temp = [...ctx.getState()];
    temp.splice(action.index, 1);
    ctx.setState(temp);
  }
}
