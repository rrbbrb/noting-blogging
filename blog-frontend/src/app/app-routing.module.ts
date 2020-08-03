import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/login/signup/signup.component';
import { LoginComponent } from './components/login/login/login.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { HomeComponent } from './components/home/home.component';
import { FullPostComponent } from './components/full-post/full-post.component';
import { SignupSuccessComponent } from './components/login/signup-success/signup-success.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { AuthGuard } from './service/auth/auth.guard';
import { PostsGuard } from './service/posts/posts.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent, pathMatch: 'full' },
    { path: 'signup-success', component: SignupSuccessComponent },
    { path: 'new', component: NewPostComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'post/:id', component: FullPostComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditPostComponent, canActivate: [AuthGuard, PostsGuard] },
    { path: ':username', component: UserPostsComponent, canActivate: [AuthGuard] },
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