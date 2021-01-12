import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LoginApiService} from '../../../services/login-api/login-api.service';
import {UtilsMessage} from '../../../shared/utils/utils-message';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<RegistrationDialogComponent>,
              private loginService: LoginApiService) {}

  registrationStart = true;
  registrationInProgress = false;
  registrationDone = false;

  ngOnInit(): void {
  }

  register(form: NgForm): void {
    this.registrationInProgress = true;
    this.registrationStart = false;
    this.loginService.register(form.value)
      .subscribe(_ => {
        this.registrationDone = true;
        this.registrationInProgress = false;
        UtilsMessage.showMessage(UtilsMessage.MESSAGE_REGISTERED_IN, UtilsMessage.MESSAGE_WORKPLACE_CREATED);
      });
  }
}
