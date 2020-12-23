import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkplaceSettingsComponent } from './workplace-settings.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {MatTabsModule} from '@angular/material/tabs';

const routes = [
  {
    path: '',
    component: WorkplaceSettingsComponent
  }
];

@NgModule({
  declarations: [WorkplaceSettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MatTabsModule
  ]
})
export class WorkplaceSettingsModule { }
