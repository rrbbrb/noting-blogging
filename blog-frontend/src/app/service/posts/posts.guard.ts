import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsService } from './posts.service';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PostsGuard implements CanActivate {

  constructor(private postsService: PostsService, private authService: AuthService, private router: Router, private translateService: TranslateService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id: number = +next.paramMap.get('id');
      let username: string;
      this.postsService.getUsernameByPost(id).subscribe(data => {
        username = data;
      });
      if(!this.authService.matchUser(username)) {
        this.translateService.get('posts.noPermissionEdit').subscribe(translation => {
          window.alert(translation);
        });
        this.router.navigateByUrl(`/post/${id}`);
        return false;
      }
      return true;
  }
  
}
