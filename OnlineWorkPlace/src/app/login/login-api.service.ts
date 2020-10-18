import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private url = 'https://729558d8-59b2-4855-a889-e219fbce401b.mock.pstmn.io/';
  constructor(private http: HttpClient) { }

  login(user: {email: string, password: string}): Observable<UserModel> {
    return this.http.post<UserModel>(this.url + 'login', user);

  }
}
