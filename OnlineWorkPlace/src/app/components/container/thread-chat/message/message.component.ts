import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from '../../../../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  message: MessageModel;
  userName: string;

  constructor() {
  }

  ngOnInit(): void {
    this.userName = `${this.message?.senderUser.userName} ${this.message?.senderUser.userSurname} `;
  }

}
