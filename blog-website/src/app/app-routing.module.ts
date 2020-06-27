import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/login/signup/signup.component';
import { LoginComponent } from './components/login/login/login.component';
import { VerificationLinkComponent } from './components/login/verification-link/verification-link.component';
import { VerifiedComponent } from './components/login/verified/verified.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { HomeComponent } from './components/home/home.component';
import { FullPostComponent } from './components/full-post/full-post.component';
import { PasswordResetComponent } from './components/login/password-reset/password-reset.component';
import { ResetSuccessComponent } from './components/login/reset-success/reset-success.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'verification-link', component: VerificationLinkComponent },
    { path: 'verified', component: VerifiedComponent },
    { path: 'new', component: NewPostComponent },
    { path: 'home', component: HomeComponent },
    { path: 'post/id', component: FullPostComponent },
    { path: 'password-reset', component: PasswordResetComponent },
    { path: 'reset-success', component: ResetSuccessComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}