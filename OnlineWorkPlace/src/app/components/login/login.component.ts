import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationDialogComponent} from './registration-dialog/registration-dialog.component';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginApiService} from '../../services/login-service/login-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router, private loginApiService: LoginApiService) { }

  ngOnInit(): void {
  }

  registration(): void {
    this.dialog.open(RegistrationDialogComponent);
  }

  login(form: NgForm): void {
    const login = {email: form.value.email, password: form.value.password};
    this.loginApiService.login(login);
  }
}
