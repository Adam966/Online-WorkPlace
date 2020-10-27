import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginApiService} from '../login/login-api.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerGuard implements CanActivate {
  constructor(private loginService: LoginApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('Token')) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
