import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInUsersGuard } from './auth/guard/logged-in-users.guard';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { MainViewComponent } from './_main/components/main-view/main-view.component';
import { TermsAndConditionsPage } from './_main/pages/terms-and-conditions/terms-and-conditions.page';
import { PrivacyPolicyPage } from './_main/pages/privacy-policy/privacy-policy.page';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsPage,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyPage,
  },
  {
    path: 'about',
    component: LandingPageComponent,
  },
  {
    path: 'changelog',
    component: LandingPageComponent,
  },
  {
    path: 'docs',
    component: LandingPageComponent,
  },
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
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
            path: 'calendar',
            loadChildren: () => import('./calendar/calendar.module').then((m) => m.CalendarModule),
          },
          {
            path: 'messages',
            loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule),
          },
          {
            path: 'meetings',
            loadChildren: () => import('./meetings/meetings.module').then((m) => m.MeetingsModule),
          },
          {
            path: '',
            loadChildren: () =>
              import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
          },
        ],
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
