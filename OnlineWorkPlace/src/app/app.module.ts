import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './components/container/container.component';
import { MainScreenComponent } from './components/container/main-screen/main-screen.component';
import { WorkplaceComponent } from './components/container/main-screen/workplace/workplace.component';
import { CreateWorkplaceDialogComponent } from './components/container/main-screen/create-workplace-dialog/create-workplace-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WorkplaceScreenComponent } from './components/container/workplace-screen/workplace-screen.component';
import { WorkplaceElementComponent } from './components/container/workplace-screen/workplace-element/workplace-element.component';
import { RegistrationDialogComponent } from './components/login/registration-dialog/registration-dialog.component';
import { NgxMasonryModule } from 'ngx-masonry';
import {NgxsModule} from '@ngxs/store';
import {LoginState} from './store/login';
import {WorkplaceState} from './store/workplace';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import { NoteThreadDialogComponent } from './components/container/workplace-screen/create-dialog/note-thread-dialog/note-thread-dialog.component';
import { TaskComponent } from './components/container/workplace-screen/create-dialog/checklist-dialog/task/task.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {WorkplaceElementState} from './store/workplace-element';
import {ApplicationState} from './store/application';
import {AuthenticationInterceptor} from './interceptors/authentication/authentication-interceptor.service';
import {HandleResponseInterceptor} from './interceptors/response/handle-response.interceptor';
import {ChecklistDialogComponent} from './components/container/workplace-screen/create-dialog/checklist-dialog/checklist-dialog.component';
import { UserLabelComponent } from './components/container/workplace-screen/create-dialog/user-label/user-label.component';
import { ColorLabelComponent } from './components/container/workplace-screen/create-dialog/color-label/color-label.component';
import {MaterialModule} from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContainerComponent,
    MainScreenComponent,
    WorkplaceComponent,
    CreateWorkplaceDialogComponent,
    PageNotFoundComponent,
    WorkplaceScreenComponent,
    WorkplaceElementComponent,
    RegistrationDialogComponent,
    NoteThreadDialogComponent,
    ChecklistDialogComponent,
    TaskComponent,
    UserLabelComponent,
    ColorLabelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NgxMasonryModule,
    HttpClientModule,
    MaterialModule,
    NgxsModule.forRoot([LoginState, WorkplaceState, WorkplaceElementState, ApplicationState], {developmentMode: true}),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HandleResponseInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
