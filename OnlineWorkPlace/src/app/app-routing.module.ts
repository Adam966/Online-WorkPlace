import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ContainerComponent} from './components/container/container.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {WorkplaceScreenComponent} from './components/container/workplace-screen/workplace-screen.component';
import {MainScreenComponent} from './components/container/main-screen/main-screen.component';
import {ContainerGuard} from './components/container/container-guard/container.guard';
import {WorkplaceScreenResolver} from './resolvers/workplace-screen/workplace-screen.resolver';

const appRouting = [
  {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: ContainerComponent,
    canActivate: [ContainerGuard],
    children: [
      {
        path: 'workplace',
        component: WorkplaceScreenComponent,
        resolve: {
          workplaceElement: WorkplaceScreenResolver
        }
      },
      {
        path: 'dashboard',
        component: MainScreenComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
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
