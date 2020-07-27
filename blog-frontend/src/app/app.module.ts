import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { HomeComponent } from './components/home/home.component';
import { FullPostComponent } from './components/full-post/full-post.component';
import { SignupSuccessComponent } from './components/login/signup-success/signup-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './service/auth/auth.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientInterceptor } from './service/http-client-interceptor';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    NewPostComponent,
    HomeComponent,
    FullPostComponent,
    SignupSuccessComponent,
    EditPostComponent,
    UserPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
