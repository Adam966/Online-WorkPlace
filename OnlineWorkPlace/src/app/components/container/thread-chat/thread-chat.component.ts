import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat-socket-api/chat.service';
import {UserModel} from '../../../models/application-models/user.model';
import {Select} from '@ngxs/store';
import {LoginState} from '../../../store/login';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {threadId} from 'worker_threads';
import {MessageModel} from '../../../models/message.model';
import {filter} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-thread-chat',
  templateUrl: './thread-chat.component.html',
  styleUrls: ['./thread-chat.component.css']
})
export class ThreadChatComponent implements OnInit, OnDestroy {
  @Select(LoginState)
  user$!: Observable<UserModel>;

  messages: MessageModel[] = [];
  messageInput = new FormControl();

  private connectionStatus = new BehaviorSubject(false);

  private user: UserModel;
  private readonly threadId: string;
  private page = 1;
  notify = '';

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    this.threadId = this.route.snapshot.paramMap.get('threadId');
    this.user$.subscribe(user => this.user = user);
    this.chatService.getOldMessages(this.threadId, this.page.toString())
      .subscribe(messages => this.messages.push(...messages));
  }

  ngOnInit(): void {
    this.chatService.connectClient()
      .subscribe(() => {
        this.connectionStatus.next(true);
      });

    this.messageInput.valueChanges
      .subscribe(text => {
        if ((text as string).length > 5) {
          this.chatService.notifyTyping(this.threadId, true);
        } else {
          this.chatService.notifyTyping(this.threadId, false);
        }
      });

    this.connectionStatus
      .pipe(
        filter(connection => connection)
      ).subscribe(() => {
      this.getNewMessage();
      this.getTypeNotification();
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
    this.chatService.notifyTyping(this.threadId, false);
  }

  ngOnDestroy(): void {
    this.chatService.disconnectClient();
  }

  private getNewMessage(): void {
    this.chatService.getNewMessage(this.threadId)
      .subscribe(message => {
        this.messages.push(message);
      });
  }

  private getTypeNotification(): void {
    this.chatService.getTypeNotification(this.threadId)
      .subscribe(notification => {
          console.log(notification);
          if (notification) {
            this.notify = this.notify.concat('Someone is typing... ');
          } else {
            this.notify = '';
          }
        }
      );
  }
}
