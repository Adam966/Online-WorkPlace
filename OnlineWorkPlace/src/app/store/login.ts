import {Action, State, StateContext} from '@ngxs/store';
import {UserModel} from '../models/user.model';
import {Injectable} from '@angular/core';

export class Login {
  static readonly type = '[Login Component] Login';
  constructor(public user: UserModel) {}
}

@State<UserModel> ({
  name: 'user',
  defaults: { id: null, userName: null, userSurname: null, email: null, photo: null, token: null}
})
@Injectable()
export class LoginState {
  @Action(Login)
  login(ctx: StateContext<UserModel>, action: Login): void {
    ctx.setState(action.user);
  }
}
