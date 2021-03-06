import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat-socket-api/chat.service';
import {UserModel} from '../../../models/application-models/user.model';
import {Select} from '@ngxs/store';
import {LoginState} from '../../../store/login';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {threadId} from 'worker_threads';

@Component({
  selector: 'app-thread-chat',
  templateUrl: './thread-chat.component.html',
  styleUrls: ['./thread-chat.component.css']
})
export class ThreadChatComponent implements OnInit, OnDestroy {
  messages = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

  @Select(LoginState)
  user$!: Observable<UserModel>;
  private user: UserModel;
  private threadId: string;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    chatService.connectClient();
    this.threadId = this.route.snapshot.paramMap.get('threadId');
    this.user$.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.chatService.getOldMessages(this.threadId);
    this.chatService.getNewMessage(this.threadId)
      .subscribe((newMessage) => {
        this.messages.push(newMessage);
      });
  }

  sendMessage(message: string): void {
    // TODO set date to be utc
    const threadMessage = {
      description: message,
      timestamp: new Date().getUTCMilliseconds().toString(),
      senderUser: this.user
    };
    this.chatService.sendMessage(threadMessage, this.threadId);
  }

  ngOnDestroy(): void {
    this.chatService.disconnectClient();
  }
}
