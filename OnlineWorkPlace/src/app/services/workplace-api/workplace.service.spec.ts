import { TestBed } from '@angular/core/testing';

import { WorkplaceServiceApi } from './workplace-service-api.service';

describe('WorkplaceService', () => {
  let service: WorkplaceServiceApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkplaceServiceApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
