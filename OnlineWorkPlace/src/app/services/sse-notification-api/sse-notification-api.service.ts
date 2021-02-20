import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationModel} from '../../models/notification.model';
import {AbstractApiService} from '../abstract-api.service';

@Injectable({
  providedIn: 'root'
})
export class SseNotificationApiService extends AbstractApiService {
  constructor(private http: HttpClient) {
    super();
    this.notificationsSource = this.getSseNotificationsStream();
  }

  private notificationsSource: EventSource;

  getSseNotificationsStream(): EventSource {
    return new EventSource('api/sse/notification/1');
  }

  setListeners(): void {
    this.notificationsSource.addEventListener('notification', (event) => {
      console.log(event);
    });
  }

  getNotifications(): Observable<NotificationModel[]> {
    // TODO create request
    return this.http.get<NotificationModel[]>(this.createUrl(''));
  }
}
