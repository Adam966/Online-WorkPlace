import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from '../../../../models/application-models/message.model';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {RemovePopUpMessage} from '../../../../store/message-pop-up';

@Component({
  selector: 'app-error-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  message: MessageModel;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.removeMessage();
    }, 3000);
  }

  @Dispatch()
  removeMessage(): RemovePopUpMessage{
    return new RemovePopUpMessage();
  }
}
