import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HandleResponseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  // create alert message service
  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status < 400) {

    }
    else if (error.status >= 400 && error.status < 500) {

    } else if (error.status > 500) {

    } else {

    }
    console.log(error);
    return EMPTY;
  }
}
