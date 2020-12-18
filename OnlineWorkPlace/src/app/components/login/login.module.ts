import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {RegistrationDialogComponent} from './registration-dialog/registration-dialog.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {FormsModule} from '@angular/forms';

const routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginModule { }
