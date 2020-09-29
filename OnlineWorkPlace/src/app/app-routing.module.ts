import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ContainerComponent} from './container/container.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRouting = [
  {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: ContainerComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
