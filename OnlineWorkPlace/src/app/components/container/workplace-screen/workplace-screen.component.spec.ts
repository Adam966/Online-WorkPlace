import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceScreenComponent } from './workplace-screen.component';

describe('WorkplaceScreenComponent', () => {
  let component: WorkplaceScreenComponent;
  let fixture: ComponentFixture<WorkplaceScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkplaceScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
