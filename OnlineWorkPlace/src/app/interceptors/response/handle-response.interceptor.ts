import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UtilsMessage} from '../../shared/utils/utils-message';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {Logout} from '../../store/login';

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

  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status < 400) {

    }
    else if (error.status >= 400 && error.status < 500) {
      if (error.status === 401) {
        if (error.error.path === '/api/login') {
          UtilsMessage.showMessage('Wrong User Credentials', UtilsMessage.MESSAGE_STATUS_ERROR);
        } else {
          this.logoutUser();
          UtilsMessage.showMessage('Session is expired', UtilsMessage.MESSAGE_STATUS_ERROR);
        }
      } else if (error.status === 409) {
        UtilsMessage.showMessage(error.error.message, UtilsMessage.MESSAGE_STATUS_ERROR);
      }
    } else if (error.status > 500) {

    } else {

    }
    console.log(error);
    return throwError(error);
  }

  @Dispatch()
  logoutUser(): Logout {
    return new Logout();
  }
}
