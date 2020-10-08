import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationDialogComponent} from './registration-dialog/registration-dialog.component';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('signUpForm')
  form: NgForm;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  registration(): void {
    this.dialog.open(RegistrationDialogComponent);
  }

  login(): void {
    this.router.navigate(['/main']);
  }
}
