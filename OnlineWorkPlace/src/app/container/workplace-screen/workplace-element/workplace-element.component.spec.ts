import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceElementComponent } from './workplace-element.component';

describe('WorkplaceElementComponent', () => {
  let component: WorkplaceElementComponent;
  let fixture: ComponentFixture<WorkplaceElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkplaceElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
