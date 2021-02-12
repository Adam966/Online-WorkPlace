import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkplaceSettingsComponent } from './workplace-settings.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {MatTabsModule} from '@angular/material/tabs';
import {SharedModule} from '../../../shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddLabelComponent } from './add-label/add-label/add-label.component';
import { AddUserComponent } from './add-user/add-user/add-user.component';
import {FormsModule} from '@angular/forms';

const routes = [
  {
    path: '',
    component: WorkplaceSettingsComponent
  }
];

@NgModule({
  declarations: [WorkplaceSettingsComponent, AddLabelComponent, AddUserComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        MatTabsModule,
        MatCheckboxModule,
        SharedModule,
        FormsModule,
    ]
})
export class WorkplaceSettingsModule { }
