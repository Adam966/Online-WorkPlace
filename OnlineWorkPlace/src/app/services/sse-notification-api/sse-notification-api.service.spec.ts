import { TestBed } from '@angular/core/testing';

import { SseNotificationApiService } from './sse-notification-api.service';

describe('SseNotificationApiService', () => {
  let service: SseNotificationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SseNotificationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
