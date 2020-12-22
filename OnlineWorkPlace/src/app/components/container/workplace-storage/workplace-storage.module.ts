import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkplaceStorageComponent } from './workplace-storage.component';
import {RouterModule} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MaterialModule} from '../../../material/material.module';
import { FileComponent } from './file/file.component';

const routes = [
  {
    path: '',
    component: WorkplaceStorageComponent
  }
];

@NgModule({
  declarations: [WorkplaceStorageComponent, FileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MaterialModule
  ]
})
export class WorkplaceStorageModule { }
