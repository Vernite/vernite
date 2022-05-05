import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing';
import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';
import { MainModule } from '../_main/_main.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, MainModule, ReactiveFormsModule],
  declarations: [LoginPage, RegisterPage],
})
export class AuthModule {}
