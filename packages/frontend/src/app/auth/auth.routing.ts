import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordPage } from './pages/change-password/change-password.page';
import { DeleteAccountPage } from './pages/delete-account/delete-account.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterInProgressPage } from './pages/register-in-progress/register-in-progress.page';
import { RegisterTokenExpiredPage } from './pages/register-token-expired/register-token-expired.page';
import { RegisterTokenSuccessPage } from './pages/register-token-success/register-token-success.page';
import { RegisterPage } from './pages/register/register.page';
import { RestoreAccountPage } from './pages/restore-account/restore-account.page';

/**
 * Auth routes list
 */
const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'logout',
    component: LoginPage,
  },
  {
    path: 'password-reset',
    component: ForgotPasswordPage,
  },
  {
    path: 'set-new-password',
    component: ChangePasswordPage,
  },
  {
    path: 'restore-account',
    component: RestoreAccountPage,
  },
  {
    path: 'delete-account',
    component: DeleteAccountPage,
  },
  {
    path: 'register',
    children: [
      {
        path: 'in-progress',
        component: RegisterInProgressPage,
      },
      {
        path: 'token-success',
        component: RegisterTokenSuccessPage,
      },
      {
        path: 'token-expired',
        component: RegisterTokenExpiredPage,
      },
      {
        path: '',
        pathMatch: 'full',
        component: RegisterPage,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

/**
 * Auth routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
