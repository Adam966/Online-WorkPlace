import { TestBed } from '@angular/core/testing';

import { ContainerGuard } from './container.guard';

describe('ContainerGuard', () => {
  let guard: ContainerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContainerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
