import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import {RouterModule} from '@angular/router';
import {NgxDocViewerModule} from 'ngx-doc-viewer';

const routes = [
  {
    path: '',
    component: DocumentComponent
  }
];

@NgModule({
  declarations: [DocumentComponent],
  imports: [
    CommonModule,
    NgxDocViewerModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class DocumentModule { }
