import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadChatComponent } from './thread-chat.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterModule} from '@angular/router';
import { MessageComponent } from './message/message.component';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

const routes = [
  {
    path: '',
    component: ThreadChatComponent
  }
];

@NgModule({
  declarations: [ThreadChatComponent, MessageComponent],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})
export class ThreadChatModule { }
