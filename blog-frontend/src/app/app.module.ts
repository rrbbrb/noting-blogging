import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { VerificationLinkComponent } from './components/login/verification-link/verification-link.component';
import { VerifiedComponent } from './components/login/verified/verified.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { HomeComponent } from './components/home/home.component';
import { FullPostComponent } from './components/full-post/full-post.component';
import { PasswordResetComponent } from './components/login/password-reset/password-reset.component';
import { ResetSuccessComponent } from './components/login/reset-success/reset-success.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    VerificationLinkComponent,
    VerifiedComponent,
    NewPostComponent,
    HomeComponent,
    FullPostComponent,
    PasswordResetComponent,
    ResetSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
