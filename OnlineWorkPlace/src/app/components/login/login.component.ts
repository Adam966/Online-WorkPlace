import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationDialogComponent} from './registration-dialog/registration-dialog.component';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginApiService} from '../../services/login-api/login-api.service';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {UserModel} from '../../models/application-models/user.model';
import {Login} from '../../store/login';
import {UtilsMessage} from '../../shared/utils/utils-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('registrationForm', { static: true })
  form: NgForm;

  constructor(private dialog: MatDialog,
              private router: Router,
              private loginApiService: LoginApiService) {}

  isLoading = false;

  ngOnInit(): void {
  }

  registration(): void {
    this.dialog.open(RegistrationDialogComponent);
  }

  login(form: NgForm): void {
    this.isLoading = true;
    const login = {email: form.value.email, password: form.value.password};
    this.loginApiService.login(login)
      .pipe(
        catchError((_: HttpErrorResponse)  => {
        this.isLoading = false;
        return null;
      }))
      .subscribe(response => {
        const token = response.headers.get('Authorization');
        const userResponse = {...response.body, token};
        this.saveUser(userResponse);
        this.router.navigate(['main']);
    });
  }

  @Dispatch()
  saveUser(user: UserModel): Login {
    UtilsMessage.showMessage(UtilsMessage.MESSAGE_LOGGED_IN, UtilsMessage.MESSAGE_STATUS_NEUTRAL);
    return new Login(user);
  }
}
