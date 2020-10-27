import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {Store} from '@ngxs/store';
import {Login} from '../store/login';
import {Router} from '@angular/router';
import {SetApplicationState} from '../store/application';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private url = 'https://729558d8-59b2-4855-a889-e219fbce401b.mock.pstmn.io/';
  constructor(private http: HttpClient, private store: Store, private router: Router) { }

  login(user: {email: string, password: string}): void {
    this.http.post<UserModel>(this.url + 'login', user)
      .subscribe((response) => {
        this.store.dispatch(new Login(response));
        this.store.dispatch(new SetApplicationState(true));
        localStorage.setItem('Token', response.token);
        this.router.navigate(['/main']);
      }, error => {
        console.log(error.message);
      });
  }
}
