import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from './container/container.component';
import { MainScreenComponent } from './container/main-screen/main-screen.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { WorkplaceComponent } from './container/main-screen/workplace/workplace.component';
import { CreateWorkplaceDialogComponent } from './container/main-screen/create-workplace-dialog/create-workplace-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkplaceScreenComponent } from './container/workplace-screen/workplace-screen.component';
import {MatBadgeModule} from '@angular/material/badge';
import { WorkplaceElementComponent } from './container/workplace-screen/workplace-element/workplace-element.component';
import { RegistrationDialogComponent } from './login/registration-dialog/registration-dialog.component';
import { NgxMasonryModule } from 'ngx-masonry';
import {NgxsModule} from '@ngxs/store';
import {LoginState} from './store/login';
import {WorkplaceState} from './store/workplace';
import {HttpClientModule} from '@angular/common/http';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';

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
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatMenuModule,
    AppRoutingModule,
    MatBadgeModule,
    NgxMasonryModule,
    HttpClientModule,
    NgxsModule.forRoot([LoginState, WorkplaceState], {
      developmentMode: true
    }),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
