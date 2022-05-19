import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordPage } from './pages/change-password/change-password.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { LoginPage } from './pages/login/login.page';
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
    path: 'register',
    component: RegisterPage,
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
];

/**
 * Auth routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
