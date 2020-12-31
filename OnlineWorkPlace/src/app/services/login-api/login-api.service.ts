import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../models/application-models/user.model';
import {Login} from '../../store/login';
import {Router} from '@angular/router';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {UtilsMessage} from '../../shared/utils/utils-message';
import {AbstractApiService} from '../abstract-api.service';
import {LOGIN, REGISTER} from '../url_const';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService extends AbstractApiService {
  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  login(user: {email: string, password: string}): void {
    this.http.post<UserModel>(this.createUrl(LOGIN), user, {observe: 'response'})
      .subscribe((response) => {
        const token = response.headers.get('Authorization');
        const userResponse = { ...response.body, token };

        this.saveUser(userResponse);
        this.router.navigate(['main']);
      });
  }

  register(user: any): Observable<any> {
    return this.http.put(this.createUrl(REGISTER), user);
  }

  @Dispatch()
  saveUser(user: UserModel): Login {
    UtilsMessage.showMessage(UtilsMessage.MESSAGE_LOGGED_IN, UtilsMessage.MESSAGE_STATUS_NEUTRAL);
    return new Login(user);
  }
}
