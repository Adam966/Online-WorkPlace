import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MainScreenComponent} from './main-screen.component';
import {MainScreenResolver} from '../../../resolvers/main-screen/main-screen.resolver';
import {CreateWorkplaceDialogComponent} from './create-workplace-dialog/create-workplace-dialog.component';
import {WorkplaceComponent} from './workplace/workplace.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule} from '@angular/forms';

const routes = [
  {
    path: '',
    component: MainScreenComponent,
    resolve: {
      workplaces: MainScreenResolver
    }
  }
];

@NgModule({
  declarations: [
    MainScreenComponent,
    CreateWorkplaceDialogComponent,
    WorkplaceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MainScreenResolver
  ],
  exports: [RouterModule]
})
export class MainScreenModule { }
