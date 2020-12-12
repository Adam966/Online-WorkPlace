import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../models/application-models/user.model';
import {Login} from '../../store/login';
import {Router} from '@angular/router';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SetPopUpMessage} from '../../store/message-pop-up';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: {email: string, password: string}): void {
    this.http.post<UserModel>(this.url + 'login', user)
      .subscribe((response) => {
        this.saveUser(response);
        this.router.navigate(['main']);
      });
  }

  @Dispatch()
  saveUser(user: UserModel): Login {
    this.showMessage();
    return new Login(user);
  }

  @Dispatch()
  showMessage(): SetPopUpMessage {
    return new SetPopUpMessage({status: 'neutral-message', title: 'Successfully logged in'});
  }
}
