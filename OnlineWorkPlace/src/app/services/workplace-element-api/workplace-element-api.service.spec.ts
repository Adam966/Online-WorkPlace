import { TestBed } from '@angular/core/testing';

import { WorkplaceElementApiService } from './workplace-element-api.service';

describe('WorkplaceElementApiService', () => {
  let service: WorkplaceElementApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkplaceElementApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
