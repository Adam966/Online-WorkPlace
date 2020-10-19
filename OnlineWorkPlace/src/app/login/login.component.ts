import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationDialogComponent} from './registration-dialog/registration-dialog.component';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {Login} from '../store/login';
import {LoginApiService} from './login-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router, private store: Store, private loginService: LoginApiService) { }

  ngOnInit(): void {
  }

  registration(): void {
    this.dialog.open(RegistrationDialogComponent);
  }

  login(form: NgForm): void {
    this.loginService.login({email: form.value.email, password: form.value.password});
  }
}
