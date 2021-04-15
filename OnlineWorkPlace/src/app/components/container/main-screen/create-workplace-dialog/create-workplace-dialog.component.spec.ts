import {ComponentFixture, TestBed} from '@angular/core/testing';

import { CreateWorkplaceDialogComponent } from './create-workplace-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';
import {NgxsModule} from '@ngxs/store';
import {WorkplaceState} from '../../../../store/workplace';
import {FormsModule} from '@angular/forms';

describe('CreateWorkplaceDialogComponent', () => {
  let component: CreateWorkplaceDialogComponent;
  let fixture: ComponentFixture<CreateWorkplaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkplaceDialogComponent ],
      imports: [ MatDialogModule,
        HttpClientModule,
        NgxsDispatchPluginModule,
        FormsModule,
        [NgxsModule.forRoot([ WorkplaceState ])]],
      providers: [ { provide: MatDialogRef, useValue: {} } ]
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

  it('#create workplace ', () => {
    const form = component.form.form;

    form.patchValue({name: 'test name', description: 'test description', colorOfElement: '#testColor', backgroundColor: ''});
    fixture.detectChanges();
  });
});
