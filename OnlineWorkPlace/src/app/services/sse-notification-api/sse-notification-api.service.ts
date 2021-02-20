import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SseNotificationApiService {
  constructor() {
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
}
