import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from '../../../../models/application-models/message.model';

@Component({
  selector: 'app-error-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  error: MessageModel;

  constructor() { }

  ngOnInit(): void {
  }
}
