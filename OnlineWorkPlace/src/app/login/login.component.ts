import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CreateWorkplaceDialogComponent} from '../container/main-screen/create-workplace-dialog/create-workplace-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationDialogComponent} from './registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  registration(): void {
    this.dialog.open(RegistrationDialogComponent);
  }
}
