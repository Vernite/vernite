import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInUsersGuard } from './auth/guard/logged-in-users.guard';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { MainViewComponent } from './_main/components/main-view/main-view.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'landing-page',
    component: LandingPageComponent,
  },
  {
    path: '',
    component: MainViewComponent,
    canActivate: [LoggedInUsersGuard],
    children: [
      {
        path: 'email',
        loadChildren: () => import('./emails/emails.module').then((m) => m.EmailsModule),
      },
      {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule),
      },
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
