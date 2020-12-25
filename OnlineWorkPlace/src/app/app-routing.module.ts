import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ContainerComponent} from './components/container/container.component';
import {ContainerGuard} from './components/container/container-guard/container.guard';
import {WorkplaceScreenResolver} from './resolvers/workplace-screen/workplace-screen.resolver';

const appRouting = [
  {path: '', component: AppComponent},
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'main',
    component: ContainerComponent,
    canActivate: [ContainerGuard],
    children: [
      {
        path: 'workplace',
        loadChildren: () => import('./components/container/main-screen/main-screen.module').then(m => m.MainScreenModule),
      },
      {
        path: 'workplace/:workplaceId',
        loadChildren: () => import('./components/container/workplace-screen/workplace-screen.module').then(m => m.WorkplaceScreenModule),
      },
      {
        path: 'workplace/:workplaceId/storage',
        loadChildren: () => import('./components/container/workplace-storage/workplace-storage.module').then(m => m.WorkplaceStorageModule),
      },
      {
        path: 'workplace/:workplaceId/thread/:threadId',
        loadChildren: () => import('./components/container/thread-chat/thread-chat.module').then(m => m.ThreadChatModule),
      },
      {
        path: 'workplace/:workplaceId/settings',
        loadChildren: () => import('./components/container/workplace-settings/workplace-settings.module').then(m => m.WorkplaceSettingsModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./components/container/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'document',
        loadChildren: () => import('./components/container/document/document.module').then(m => m.DocumentModule),
      },
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./components/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
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
  ],
  providers: [ WorkplaceScreenResolver ]
})
export class AppRoutingModule { }
