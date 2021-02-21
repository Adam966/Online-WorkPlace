import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationModel} from '../../models/notification.model';
import {AbstractApiService} from '../abstract-api.service';
import {SET_NOTIFICATIONS_STREAM} from '../url_const';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {AddNewNotification} from '../../store/notification.state';
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
    this.notificationsSource = new EventSource(`${this.createUrl(SET_NOTIFICATIONS_STREAM, userId.toString())}/workplace/${workplaceId}`);
    this.setListeners();
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
    // TODO create request
    return this.http.get<NotificationModel[]>(this.createUrl(`${this.createUrl(SET_NOTIFICATIONS_STREAM, userId.toString())}/workplace/${workplaceId}`));
  }

  @Dispatch()
  addNewNotification(notification: NotificationModel): AddNewNotification {
    return new AddNewNotification(notification);
  }
}
