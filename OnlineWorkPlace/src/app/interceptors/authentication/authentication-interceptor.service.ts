import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Select} from '@ngxs/store';
import {LoginState} from '../../store/login';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  @Select(LoginState.token)
  token$!: Observable<string>;
  private token: string;

  constructor() {
    this.token$.subscribe(token => this.token = token);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('login') && !request.url.includes('register')) {
      const changedReq = request.clone({
        headers: request.headers.set('Authorization', this.token)
      });
      return next.handle(changedReq);
    }
    return next.handle(request);
  }
}
