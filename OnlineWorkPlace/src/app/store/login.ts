import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {UserModel} from '../models/application-models/user.model';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Navigate} from '@ngxs/router-plugin';

export class Login {
  static readonly type = '[Login User] Login';
  constructor(public user: UserModel) {}
}

export class Logout {
  static readonly type = '[Logout User] Logout';
  constructor() {}
}

@State<UserModel> ({
  name: 'user',
  defaults: { id: null, username: null, usersurname: null, email: null, token: null }
})
@Injectable()
export class LoginState {
  constructor(private store: Store) {}

  @Selector()
  static userId(state: UserModel): number {
    return state.id;
  }

  @Selector()
  static token(state: UserModel): string {
    return state.token;
  }

  @Action(Login)
  login(ctx: StateContext<UserModel>, action: Login): void {
    ctx.setState(action.user);
  }

  @Action(Logout)
  logout(): void {
    this.store.reset(LoginState);
    localStorage.clear();
    this.store.dispatch(new Navigate(['/login']));
  }
}
