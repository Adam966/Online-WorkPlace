import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkplaceDialogComponent } from './create-workplace-dialog.component';

describe('CreateWorkplaceDialogComponent', () => {
  let component: CreateWorkplaceDialogComponent;
  let fixture: ComponentFixture<CreateWorkplaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkplaceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkplaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
