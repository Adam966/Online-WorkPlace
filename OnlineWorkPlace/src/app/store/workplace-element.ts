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

export class SortElements {
  static readonly type = '[WorkPlace Component] SortWorkplaceElements';
  constructor(public value: string) {}
}

export class DefaultElements {
  static readonly type = '[WorkPlace Component] SetDefaultElements';
  constructor() {}
}

@State<WorkplaceElementModel[]> ({
  name: 'workplaceElements',
  defaults: []
})
@Injectable()
export class WorkplaceElementState {
  constructor() {}
  private elements = [];

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
      const temp = [...ctx.getState()];
      temp.push(action.workplaceElement);
      ctx.setState(temp);
    }
  }

  @Action(DeleteWorkplaceElement)
  deleteWorkplace(ctx: StateContext<WorkplaceElementModel[]>, action: DeleteWorkplaceElement): void {
    const temp = [...ctx.getState()];
    temp.splice(action.index, 1);
    ctx.setState(temp);
  }

  @Action(SortElements)
  sortElements(ctx: StateContext<WorkplaceElementModel[]>, action: SortElements): void {
    this.elements = ctx.getState();
    const temp = ctx.getState();
    if (action.value.includes('#')) {
      ctx.setState(
        temp.filter((ele) => {
          let labels = '';
          ele.assignedLabels.map(label => labels = labels + label.name);
          return labels.includes(action.value.substr(1, action.value.length - 1));
        })
      );
    } else if (action.value.includes('u:')) {
      console.log(action.value.substr(3 , action.value.length - 1));
      ctx.setState(
        temp.filter((ele) => {
          let users = '';
          ele.assignedUsers.map(user => users = users + (user.userName + ' ' + user.userSurname + ', '));
          return users.includes(action.value.substr(3 , action.value.length - 1));
        })
      );
    } else {
      ctx.setState(
        temp.filter(ele => {
          return ele.name.toLowerCase().includes(action.value.toLowerCase());
        })
      );
    }
  }

  @Action(DefaultElements)
  setDefaultElements(ctx: StateContext<WorkplaceElementModel[]>, _: DefaultElements): void {
    ctx.setState(this.elements);
  }
}
