import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {SetApplicationState} from '../../store/application';
import {Store} from '@ngxs/store';

@Injectable()
export class HandleResponseInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    setTimeout(() => {
      this.store.dispatch(new SetApplicationState(true));
    });
    return next.handle(request)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.store.dispatch(new SetApplicationState(false));
          });
        }),
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
    console.log(error.message);
    return EMPTY;
  }
}
