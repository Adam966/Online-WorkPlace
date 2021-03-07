import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat-socket-api/chat.service';
import {UserModel} from '../../../models/application-models/user.model';
import {Select} from '@ngxs/store';
import {LoginState} from '../../../store/login';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {threadId} from 'worker_threads';
import {MessageModel} from '../../../models/message.model';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-thread-chat',
  templateUrl: './thread-chat.component.html',
  styleUrls: ['./thread-chat.component.css']
})
export class ThreadChatComponent implements OnInit, OnDestroy {
  @Select(LoginState)
  user$!: Observable<UserModel>;

  messages: MessageModel[] = [];

  private user: UserModel;
  private readonly threadId: string;
  private page = 1;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    this.threadId = this.route.snapshot.paramMap.get('threadId');
    this.user$.subscribe(user => this.user = user);
    this.chatService.getOldMessages(this.threadId, this.page.toString())
      .subscribe(messages => this.messages.push(...messages));
  }

  ngOnInit(): void {
    this.chatService.connectClient()
      .pipe(
        mergeMap(_ => this.chatService.getNewMessage(this.threadId))
      ).subscribe((newMessage) => {
      this.messages.push(newMessage);
    });
  }

  sendMessage(message: string): void {
    // TODO set date to be utc
    const threadMessage = {
      description: message,
      timestamp: new Date().toLocaleString(),
      senderUser: this.user
    };
    this.chatService.sendMessage(threadMessage, this.threadId);
  }

  ngOnDestroy(): void {
    this.chatService.disconnectClient();
  }
}
