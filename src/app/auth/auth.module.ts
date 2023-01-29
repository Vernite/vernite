import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../_main/_main.module';
import { AuthRoutingModule } from './auth.routing';
import { ChangePasswordPage } from './pages/change-password/change-password.page';
import { DeleteAccountPage } from './pages/delete-account/delete-account.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterInProgressPage } from './pages/register-in-progress/register-in-progress.page';
import { RegisterTokenExpiredPage } from './pages/register-token-expired/register-token-expired.page';
import { RegisterTokenSuccessPage } from './pages/register-token-success/register-token-success.page';
import { RegisterPage } from './pages/register/register.page';
import { RestoreAccountPage } from './pages/restore-account/restore-account.page';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, MainModule, ReactiveFormsModule],
  declarations: [
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ChangePasswordPage,
    RestoreAccountPage,
    DeleteAccountPage,
    RegisterInProgressPage,
    RegisterTokenExpiredPage,
    RegisterTokenSuccessPage,
  ],
})
export class AuthModule {}
