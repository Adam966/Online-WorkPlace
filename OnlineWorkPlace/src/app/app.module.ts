import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './components/container/container.component';
import { AppRoutingModule } from './app-routing.module';
import {NgxsModule} from '@ngxs/store';
import {LoginState} from './store/login';
import {WorkplaceState} from './store/workplace';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {WorkplaceElementState} from './store/workplace-element';
import {ApplicationState} from './store/application';
import {AuthenticationInterceptor} from './interceptors/authentication/authentication-interceptor.service';
import {HandleResponseInterceptor} from './interceptors/response/handle-response.interceptor';
import {MaterialModule} from './material/material.module';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {WorkplaceSettingsState} from './store/workplace-settings';
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';
import {MessageState} from './store/message-pop-up';
import {PageNotFoundModule} from './components/page-not-found/page-not-found.module';
import {LoginModule} from './components/login/login.module';
import {MainScreenModule} from './components/container/main-screen/main-screen.module';
import {WorkplaceScreenModule} from './components/container/workplace-screen/workplace-screen.module';
import {WorkplaceSettingsModule} from './components/container/workplace-settings/workplace-settings.module';

const states = [
    LoginState,
    WorkplaceState,
    WorkplaceElementState,
    ApplicationState,
    WorkplaceSettingsState,
    MessageState
];

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    LoginModule,
    MainScreenModule,
    AppRoutingModule,
    HttpClientModule,
    WorkplaceScreenModule,
    WorkplaceSettingsModule,
    MaterialModule,
    PageNotFoundModule,
    NgxsModule.forRoot(states, {developmentMode: true}),
    NgxsDispatchPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HandleResponseInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
