import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceStorageComponent } from './workplace-storage.component';

describe('WorkplaceStorageComponent', () => {
  let component: WorkplaceStorageComponent;
  let fixture: ComponentFixture<WorkplaceStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkplaceStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
