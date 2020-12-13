import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginApiService} from '../../../services/login-service/login-api.service';
import {Select} from '@ngxs/store';
import {LoginState} from '../../../store/login';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContainerGuard implements CanActivate {
  constructor(private loginService: LoginApiService, private router: Router) {}

  @Select(LoginState.token)
  isLoggedIn$: Observable<string>;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn$.pipe(
      map(isUserLogged => {
        if (isUserLogged) {
          return true;
        } else {
          const loginUrl = '/login';
          return this.router.parseUrl(loginUrl);
        }
      })
    );
  }
}
