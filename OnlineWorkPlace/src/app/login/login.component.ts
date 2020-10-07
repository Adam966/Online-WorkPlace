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
  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  registration(): void {
    this.dialog.open(RegistrationDialogComponent);
  }

  login(form: NgForm): void {
    console.log(form);
    this.router.navigate(['/main']);
  }
}
