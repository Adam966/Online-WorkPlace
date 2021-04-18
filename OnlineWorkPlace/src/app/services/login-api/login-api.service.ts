import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../models/application-models/user.model';
import {AbstractApiService} from '../abstract-api.service';
import {ADD_PHOTO, CHANGE_EMAIL, CHANGE_PASS, LOGIN, REGISTER} from '../url_const';
import {Observable} from 'rxjs';
import {createForm} from '../../shared/utils/utils-photo-form';

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

  updateEmail(userId: number, email: string): Observable<any> {
    return this.http.post(this.createUrl(CHANGE_EMAIL + userId.toString()), email);
  }

  changePassword(userId: number, password: string): Observable<any> {
    return this.http.post(this.createUrl(CHANGE_PASS + userId.toString()), password);
  }

  changePhoto(id: number, image: any): Observable<any> {
    const formData: FormData = createForm(image);
    return this.http.put(this.createUrl(ADD_PHOTO + id.toString()), formData);
  }
}
