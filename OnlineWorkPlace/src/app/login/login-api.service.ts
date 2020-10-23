import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {Login} from '../store/login';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private url = 'https://729558d8-59b2-4855-a889-e219fbce401b.mock.pstmn.io/';
  isLoggedIn = true;
  constructor(private http: HttpClient, private store: Store, private router: Router) { }

  login(user: {email: string, password: string}): void {
    this.http.post<UserModel>(this.url + 'login', user)
      .subscribe((response) => {
        this.isLoggedIn = true;
        this.store.dispatch(new Login(response));
        this.router.navigate(['/main']);
      }, error => {
        console.log(error.message);
      });
  }
}
