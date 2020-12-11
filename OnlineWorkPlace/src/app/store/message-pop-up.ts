import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {MessageModel} from '../models/application-models/message.model';

export class SetPopUpMessage {
  static readonly type = '[Message] Set Message';
  constructor(public payload: MessageModel) {}
}

export class RemovePopUpMessage {
  static readonly type = '[Message] Remove Message';
}

export class ApplicationMessageModel {
  isVisible?: boolean;
  message?: MessageModel;
}

@State<ApplicationMessageModel> ({
  name: 'popUpMessage',
  defaults: {
    isVisible: null,
    message: {
      title: '',
      status: '',
      content: ''
    }
  }
})
@Injectable()
export class MessageState {
  @Selector()
  static isVisible(state: ApplicationMessageModel): boolean {
    return state.isVisible;
  }

  @Selector()
  static message(state: ApplicationMessageModel): MessageModel {
    return state.message;
  }

  @Action(SetPopUpMessage)
  setPopUpMessage(ctx: StateContext<ApplicationMessageModel>, action: SetPopUpMessage): void {
    ctx.setState({
      isVisible: true,
      message: action.payload
    });
  }

  @Action(RemovePopUpMessage)
  removePopUpMessage(ctx: StateContext<ApplicationMessageModel>): void {
    ctx.setState({
      isVisible: false,
      message: null
    });
  }
}
