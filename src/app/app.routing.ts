import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInUsersGuard } from './auth/guard/logged-in-users.guard';
import { LandingPagePage } from './landing-page/pages/landing-page/landing-page.page';
import { MainViewComponent } from './_main/components/main-view/main-view.component';
import { TermsAndConditionsPage } from './_main/pages/terms-and-conditions/terms-and-conditions.page';
import { PrivacyPolicyPage } from './_main/pages/privacy-policy/privacy-policy.page';
import { LandingPageAboutPage } from './landing-page/pages/landing-page-about/landing-page-about.page';
import { LandingPageDocsPage } from './landing-page/pages/landing-page-docs/landing-page-docs.page';
import { LandingPageChangelogPage } from './landing-page/pages/landing-page-changelog/landing-page-changelog.page';

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
    component: LandingPageAboutPage,
  },
  {
    path: 'changelog',
    component: LandingPageChangelogPage,
  },
  {
    path: 'docs',
    component: LandingPageDocsPage,
  },
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LandingPagePage,
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
          {
            path: '**',
            redirectTo: '/dashboard',
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
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
