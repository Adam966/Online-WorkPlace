import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteThreadDialogComponent } from './note-thread-dialog.component';

describe('NoteThreadDialogComponent', () => {
  let component: NoteThreadDialogComponent;
  let fixture: ComponentFixture<NoteThreadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteThreadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteThreadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
