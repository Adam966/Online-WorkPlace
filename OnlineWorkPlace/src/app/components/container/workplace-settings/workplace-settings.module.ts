import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkplaceSettingsComponent } from './workplace-settings.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {MatTabsModule} from '@angular/material/tabs';
import {SharedModule} from '../../../shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MatTabsModule,
    MatCheckboxModule,
    SharedModule
  ]
})
export class WorkplaceSettingsModule { }
