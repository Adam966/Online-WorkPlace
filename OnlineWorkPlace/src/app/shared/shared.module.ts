import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageComponent} from './message/message.component';
import {UserLabelComponent} from './user-label/user-label.component';
import {ColorLabelComponent} from './color-label/color-label.component';

@NgModule({
  declarations: [MessageComponent, UserLabelComponent, ColorLabelComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MessageComponent,
    UserLabelComponent,
    ColorLabelComponent
  ]
})
export class SharedModule { }
