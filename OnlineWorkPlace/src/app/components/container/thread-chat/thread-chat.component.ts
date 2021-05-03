import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ChatService} from '../../../services/chat-socket-api/chat.service';
import {UserModel} from '../../../models/application-models/user.model';
import {Select} from '@ngxs/store';
import {LoginState} from '../../../store/login';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {threadId} from 'worker_threads';
import {MessageModel} from '../../../models/message.model';
import {filter} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {UtilsMessage} from '../../../shared/utils/utils-message';
import {ApplicationState} from '../../../store/application';

@Component({
  selector: 'app-thread-chat',
  templateUrl: './thread-chat.component.html',
  styleUrls: ['./thread-chat.component.css']
})
export class ThreadChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('container')
  container: ElementRef;

  @Select(LoginState)
  user$!: Observable<UserModel>;

  @Select(ApplicationState.currentWorkplaceId)
  currentWorkplaceId$!: Observable<string>;
  currentWorkplaceId: string;

  messages: MessageModel[] = [];
  messageInput = new FormControl();

  private connectionStatus = new BehaviorSubject(false);

  private user: UserModel;
  private readonly threadId: string;
  private page = 0;
  notify = '';
  private notOldMessagesAnymore = false;
  loadingMessages = false;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    this.threadId = this.route.snapshot.paramMap.get('threadId');
    this.user$.subscribe(user => this.user = user);
    this.getOldMessages();

    this.currentWorkplaceId$.subscribe(data => {
      this.currentWorkplaceId = data;
    });
  }

  private getOldMessages(): void {
    this.loadingMessages = true;
    this.chatService.getOldMessages(this.threadId, this.page.toString(), +this.currentWorkplaceId)
      .subscribe(messages => {
        this.messages.push(...messages);
        this.page = this.page + 1;
        this.loadingMessages = false;
      }, (err => {
        this.notOldMessagesAnymore = true;
        this.loadingMessages = false;
        UtilsMessage.showMessage(err.error.message, UtilsMessage.MESSAGE_STATUS_ERROR);
        return of(err);
      }));
  }

  ngOnInit(): void {
    this.chatService.connectClient()
      .subscribe(() => {
        this.connectionStatus.next(true);
      });

    /*    this.messageInput.valueChanges
          .subscribe(text => {
            if ((text as string).length > 5) {
              this.chatService.notifyTyping(this.threadId, true);
            } else {
              this.chatService.notifyTyping(this.threadId, false);
            }
          });*/

    this.connectionStatus
      .pipe(
        filter(connection => connection)
      ).subscribe(() => {
      this.getNewMessage();
      this.getTypeNotification();
    });
  }

  sendMessage(message: string): void {
    if (message) {
      const threadMessage = {
        description: message,
        timestamp: new Date().toString(),
        senderUser: this.user
      };
      this.chatService.sendMessage(threadMessage, this.threadId);
      this.messageInput.patchValue('');
      this.messages.unshift(threadMessage);

      this.scrollToBottom();
      // this.chatService.notifyTyping(this.threadId, false);
    }
  }

  ngOnDestroy(): void {
    this.chatService.disconnectClient();
  }

  private getNewMessage(): void {
    this.chatService.getNewMessage(this.threadId)
      .subscribe(message => {
        this.messages.unshift(message);
        this.scrollToBottom();
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

  onTop($event: Event): void {
    if (($event.target as HTMLElement).scrollTop === 0 && !this.notOldMessagesAnymore) {
      this.getOldMessages();
    }
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
    }, 10);
  }
}
