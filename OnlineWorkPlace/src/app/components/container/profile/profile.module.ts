import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';

const routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatExpansionModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileModule { }
