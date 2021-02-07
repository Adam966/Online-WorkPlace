import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../models/application-models/user.model';
import {AbstractApiService} from '../abstract-api.service';
import {LOGIN, REGISTER} from '../url_const';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService extends AbstractApiService {
  constructor(private http: HttpClient) {
    super();
  }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post<UserModel>(this.createUrl(LOGIN), user, {observe: 'response'});
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.createUrl(REGISTER), user);
  }
}
