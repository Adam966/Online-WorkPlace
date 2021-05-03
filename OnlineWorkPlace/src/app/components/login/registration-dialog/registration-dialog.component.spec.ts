import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationDialogComponent} from './registration-dialog.component';
import {LoginApiService} from '../../../services/login-api/login-api.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LoginMockService} from '../../../../test/login.mock.service';
import {NgxsModule, Store} from '@ngxs/store';
import {UtilsMessage} from '../../../shared/utils/utils-message';
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';
import {MessageState} from '../../../store/message-pop-up';

describe('RegistrationDialogComponent', () => {
  let component: RegistrationDialogComponent;
  let fixture: ComponentFixture<RegistrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        NgxsDispatchPluginModule,
        [NgxsModule.forRoot([MessageState])]
      ],
      declarations: [RegistrationDialogComponent],
      providers: [LoginApiService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call register', () => {
    fixture.whenStable().then(() => {
      const form = component.form;
      const service = TestBed.inject(LoginApiService);
      const mockService = new LoginMockService();

      form.form.patchValue({name: 'Adam', surname: 'Ivan', email: 'adam.ivan@kosickaakademia.sk', password: 'Heslo123'});
      expect(component.registrationInProgress).toBeFalsy();
      expect(component.registrationDone).toBeFalsy();
      expect(component.registrationStart).toBeTruthy();

      spyOn(service, 'register').and.returnValue(mockService.register());
      component.register(form);
      fixture.detectChanges();
      expect(component.registrationInProgress).toBeFalsy();
      expect(component.registrationDone).toBeTruthy();
    });
  });

  it('should check if button is disabled if no value in input', () => {
    fixture.whenStable().then(() => {
      const form = component.form.form;
      const btn = fixture.nativeElement.querySelector('button');

      form.patchValue({name: 'Adam', surname: 'Ivan', email: 'adam.ivan@kosickaakademia.sk', password: 'Heslo123'});
      fixture.detectChanges();
      expect(form.valid).toBeTruthy();
      expect(btn.disabled).toBeFalsy();

      form.patchValue({name: '', surname: 'Ivan', email: 'adam.ivan@kosickaakademia.sk', password: 'Heslo123'});
      fixture.detectChanges();
      expect(form.valid).toBeFalsy();
      expect(btn.disabled).toBeTruthy();

      form.patchValue({name: 'Adam', surname: '', email: 'adam.ivan@kosickaakademia.sk', password: 'Heslo123'});
      fixture.detectChanges();
      expect(form.valid).toBeFalsy();
      expect(btn.disabled).toBeTruthy();

      form.patchValue({name: 'Adam', surname: 'Ivan', email: '', password: 'Heslo123'});
      fixture.detectChanges();
      expect(form.valid).toBeFalsy();
      expect(btn.disabled).toBeTruthy();

      form.patchValue({name: 'Adam', surname: 'Ivan', email: 'adam.ivan@kosickaakademia.sk', password: ''});
      fixture.detectChanges();
      expect(form.valid).toBeFalsy();
      expect(btn.disabled).toBeTruthy();

      form.patchValue({name: '', surname: '', email: '', password: ''});
      fixture.detectChanges();
      expect(form.valid).toBeFalsy();
      expect(btn.disabled).toBeTruthy();
    });
  });

  it('set pop up state after successful registration', () => {
    fixture.whenStable().then(() => {
      const store = TestBed.inject(Store);
      const messageMock = {
        isVisible: true,
        message: {
          title: UtilsMessage.MESSAGE_REGISTERED_IN,
          status: UtilsMessage.MESSAGE_STATUS_POSITIVE,
          content: undefined
        }
      };

      const form = component.form;
      form.form.patchValue({name: 'Adam', surname: 'Ivan', email: 'adam.ivan@kosickaakademia.sk', password: ''});
      component.register(form);

      const messageState = store.selectSnapshot(state => state.popUpMessage);
      expect(messageState).toEqual(messageMock);
    });
  });
});
