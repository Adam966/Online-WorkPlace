import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('login')) {
      const changedReq = request.clone({
        // get token from cookies
        headers: request.headers.set('Authorization', 'Bearer ahgf456jgaô36875dfj77687kgá64567rgaouriga527')
      });
      return next.handle(changedReq);
    }
    return next.handle(request);
  }
}
