import {Action, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NotificationModel} from '../models/notification.model';

export class AddNewNotification {
  constructor(public payload: NotificationModel) {
  }
  static readonly type = '[Notification] Add Notification';
}

export class SetNotifications {
  constructor(public payload: NotificationModel[]) {
  }
  static readonly type = '[Notification] Set Notifications';
}

@State<NotificationModel[]>({
  name: 'notifications',
  defaults: [],
})
@Injectable()
export class NotificationState {
  @Action(AddNewNotification)
  addNewNotification(ctx: StateContext<NotificationModel[]>, action: AddNewNotification): void {
    const list = [...ctx.getState()];
    list.push(action.payload);
    ctx.setState(list);
  }

  @Action(SetNotifications)
  setNotifications(ctx: StateContext<NotificationModel[]>, action: SetNotifications): void {
    // TODO add pageable not all once time
    ctx.setState(action.payload);
  }
}
