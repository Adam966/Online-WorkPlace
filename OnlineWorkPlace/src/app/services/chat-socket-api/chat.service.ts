import {Injectable} from '@angular/core';
import {GET_NEW_MESSAGE, SEND_NEW_MESSAGE, SET_SOCKET_URL} from '../url_const';
import * as Stomp from 'stompjs';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UtilsMessage} from '../../shared/utils/utils-message';
import {MessageModel} from '../../models/message.model';
import {Message} from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = SET_SOCKET_URL;
  private stompClient: Stomp.Client;
  private readonly socket: WebSocket;

  constructor(private http: HttpClient) {
    this.socket = new WebSocket(this.url);
    this.stompClient = Stomp.over(this.socket);
  }

  disconnectClient(): void {
    this.stompClient.disconnect(() => {
      this.socket.close();
    });
  }

  connectClient(): void {
    this.stompClient.connect({},
      () => {},
      (_) => {
        this.socket.close();
        UtilsMessage.showMessage(UtilsMessage.MESSAGE_UNEXPECTED_ERROR, UtilsMessage.MESSAGE_STATUS_ERROR);
      }
    );
  }

  getNewMessage(threadId: string): Observable<MessageModel> {
    return new Observable<MessageModel>((subscriber) => {
      this.stompClient.subscribe(`${GET_NEW_MESSAGE}/${threadId}`, (message  ) => {
        subscriber.next(
          this.parseContent(message)
        );
      });
    });
  }

  sendMessage(threadMessage: MessageModel, threadId: string): void {
      this.stompClient.send(`${SEND_NEW_MESSAGE}/${threadId}`, {}, JSON.stringify(threadMessage));
  }

  getOldMessages(threadId: string): Observable<MessageModel[]> {
    // TODO get all old messages with paginator
    return null;
  }

  private parseContent(message: Message): MessageModel {
    return JSON.parse(message.body);
  }
}
