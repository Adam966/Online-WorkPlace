import { TestBed } from '@angular/core/testing';

import { WorkplaceSettingsApiService } from './workplace-settings-api.service';

describe('WorkplaceSettingsApiService', () => {
  let service: WorkplaceSettingsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkplaceSettingsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
