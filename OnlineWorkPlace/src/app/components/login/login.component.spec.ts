import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {LoginApiService} from '../../services/login-api/login-api.service';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LoginMockService} from '../../../test/login.mock.service';
import {NgxsModule, Store} from '@ngxs/store';
import {LoginState} from '../../store/login';
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';
import {UtilsMessage} from '../../shared/utils/utils-message';
import {MessageState} from '../../store/message-pop-up';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        NgxsDispatchPluginModule,
        [NgxsModule.forRoot([LoginState, MessageState])]
      ],
      providers: [LoginApiService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test form validation', async () => {
    fixture.whenStable().then(() => {
      const form = component.form.form;
      const btn = fixture.nativeElement.querySelector('button');

      form.patchValue({email: '', password: ''});
      fixture.detectChanges();
      expect(form.valid).toBeFalsy();

      form.patchValue({email: 'adam', password: 'heslo'});
      fixture.detectChanges();
      expect(form.valid).toBeFalsy();

      form.patchValue({email: '', password: 'heslo'});
      fixture.detectChanges();
      expect(form.valid).toBeFalsy();

      form.patchValue({email: 'adam', password: ''});
      fixture.detectChanges();
      expect(form.valid).toBeFalsy();

      expect(btn.disabled).toBeTruthy();

      form.patchValue({email: 'adam.ivan@kosickaakademia.sk', password: 'Heslo123'});
      fixture.detectChanges();
      expect(form.valid).toBeTruthy();
      expect(btn.disabled).toBeFalsy();
    });
  });

  it('call login', () => {
    const form = component.form;
    const service = TestBed.inject(LoginApiService);
    const mockService = new LoginMockService();

    form.form.patchValue({email: 'adam.ivan@kosickaakademia.sk', password: 'Heslo123'});
    expect(component.isLoading).toBeFalsy();

    spyOn(service, 'login').and.returnValue(mockService.login());
    component.login(form);
    fixture.detectChanges();
    expect(component.isLoading).toBeTruthy();
  });

  it('check storage state to be null', () => {
    const store = TestBed.inject(Store);
    const userState = store.selectSnapshot(state => state.user);
    expect(userState).toEqual({id: null, userName: null, userSurname: null, email: null, token: null, photo: null});
  });

  it('saveUser()', () => {
    const store = TestBed.inject(Store);
    const stateMock = {
      id: 1,
      userName: 'Adam',
      userSurname: 'Ivan',
      email: 'adam.ivan@kosickaakademia.sk',
      token: 'g6dsi576ufgi7686uui79854',
      photo: 1
    };

    component.saveUser(stateMock);

    const userState = store.selectSnapshot(state => state.user);
    expect(userState).toEqual(stateMock);
  });

  it('set pop up state', () => {
    const store = TestBed.inject(Store);
    const messageMock = {
      isVisible: true,
      message: {
        title: UtilsMessage.MESSAGE_LOGGED_IN,
        status: UtilsMessage.MESSAGE_STATUS_NEUTRAL,
        content: undefined
      }
    };

    component.saveUser(null);

    const messageState = store.selectSnapshot(state => state.popUpMessage);
    expect(messageState).toEqual(messageMock);
  });
});
