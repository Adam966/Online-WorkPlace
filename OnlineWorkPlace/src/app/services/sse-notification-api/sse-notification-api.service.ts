import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationModel} from '../../models/notification.model';
import {AbstractApiService} from '../abstract-api.service';
import {GET_ALL_NOTIFICATIONS, SET_NOTIFICATIONS_STREAM} from '../url_const';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {AddNewNotification, SetNotifications} from '../../store/notification.state';
import {UtilsMessage} from '../../shared/utils/utils-message';

@Injectable({
  providedIn: 'root'
})
export class SseNotificationApiService extends AbstractApiService {
  constructor(private http: HttpClient) {
    super();
  }

  private notificationsSource: EventSource;

  startSseNotificationsStream(workplaceId: number, userId: number): void {
    this.getNotifications(workplaceId, userId)
      .subscribe(notifications => {
        this.notificationsSource = new EventSource(`${this.createUrl(SET_NOTIFICATIONS_STREAM, userId.toString())}/workplace/${workplaceId}`);
        this.setListeners();
        this.setAllNotifications(notifications);
      });

  }

  stopNotificationsStream(): void {
    this.notificationsSource.close();
  }

  private setListeners(): void {
    this.notificationsSource.addEventListener('notification', (event: MessageEvent) => {
      const notification = JSON.parse(event.data);
      this.addNewNotification(notification);
      UtilsMessage.showMessage(UtilsMessage.NEW_NOTIFICATION, UtilsMessage.MESSAGE_STATUS_NEUTRAL);
    });
  }

  getNotifications(workplaceId: number, userId: number): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.createUrl(GET_ALL_NOTIFICATIONS, userId.toString())}/workplace/${workplaceId.toString()}`);
  }

  @Dispatch()
  addNewNotification(notification: NotificationModel): AddNewNotification {
    return new AddNewNotification(notification);
  }

  @Dispatch()
  setAllNotifications(notifications: NotificationModel[]): SetNotifications {
    return new SetNotifications(notifications.reverse());
  }
}
