import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceSettingsComponent } from './workplace-settings.component';

describe('WorkplaceSettingsComponent', () => {
  let component: WorkplaceSettingsComponent;
  let fixture: ComponentFixture<WorkplaceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkplaceSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
