import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkplaceStorageComponent } from './workplace-storage.component';
import {RouterModule} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MaterialModule} from '../../../material/material.module';
import { FileComponent } from './file/file.component';
import {WorkplaceScreenStorageResolver} from '../../../resolvers/workplace-storage/workplace-storage.resolver';

const routes = [
  {
    path: '',
    component: WorkplaceStorageComponent,
    resolve: {
      storageFiles: WorkplaceScreenStorageResolver
    }
  }
];

@NgModule({
  declarations: [WorkplaceStorageComponent, FileComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  providers: [ WorkplaceScreenStorageResolver ]
})
export class WorkplaceStorageModule { }
