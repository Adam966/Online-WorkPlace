import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkplaceScreenComponent} from './workplace-screen.component';
import {ChecklistDialogComponent} from './create-dialog/checklist-dialog/checklist-dialog.component';
import {NoteThreadDialogComponent} from './create-dialog/note-thread-dialog/note-thread-dialog.component';
import {RouterModule} from '@angular/router';
import {WorkplaceScreenResolver} from '../../../resolvers/workplace-screen/workplace-screen.resolver';
import {TaskComponent} from './create-dialog/checklist-dialog/task/task.component';
import {WorkplaceElementComponent} from './workplace-element/workplace-element.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule} from '@angular/forms';
import {NgxMasonryModule} from 'ngx-masonry';
import {SharedModule} from '../../../shared/shared.module';

const routes = [
  {
    path: '',
    component: WorkplaceScreenComponent,
    resolve: {
      workplaceElements: WorkplaceScreenResolver
    }
  }
];

@NgModule({
  declarations: [
    WorkplaceScreenComponent,
    ChecklistDialogComponent,
    NoteThreadDialogComponent,
    TaskComponent,
    WorkplaceElementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgxMasonryModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    WorkplaceScreenResolver
  ],
  exports: [
    RouterModule
  ]
})
export class WorkplaceScreenModule { }
