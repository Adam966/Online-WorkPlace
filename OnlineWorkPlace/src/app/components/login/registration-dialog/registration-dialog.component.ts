import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginApiService} from '../../../services/login-api/login-api.service';
import {catchError} from 'rxjs/operators';
import {UtilsMessage} from '../../../shared/utils/utils-message';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {
  @ViewChild('signUpForm', { static: true })
  form: NgForm;

  constructor(private loginService: LoginApiService) {}

  registrationStart = true;
  registrationInProgress = false;
  registrationDone = false;

  ngOnInit(): void {
  }

  register(form: NgForm): void {
    this.registrationInProgress = true;
    this.registrationStart = false;
    this.loginService.register(form.value)
      .pipe(catchError(_ => {
        this.registrationInProgress = false;
        this.registrationStart = true;
        return null;
      }) )
      .subscribe(_ => {
        this.registrationDone = true;
        this.registrationInProgress = false;
        UtilsMessage.showMessage(UtilsMessage.MESSAGE_REGISTERED_IN, UtilsMessage.MESSAGE_STATUS_POSITIVE);
      });
  }
}
