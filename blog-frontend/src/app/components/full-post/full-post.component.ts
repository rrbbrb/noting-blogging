import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/service/posts/posts.service';
import { PostPayload } from '../new-post/post-payload';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css']
})
export class FullPostComponent implements OnInit {

  id: number;
  post: PostPayload;
  sameUser: boolean;


  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.postsService.getSinglePost(this.id).subscribe(data => {
      this.post = data;
      this.sameUser = this.authService.matchUser(this.post.user.username);
    });
  }

  sendPostForEdit() {
    this.postsService.injectPost(this.post);
    console.log("Injected post: " + this.post)
  }

  onDeletePost(): any {
    if (window.confirm("Are you sure to delete this post?")) {
      return this.postsService.deletePost(this.id).subscribe(data => {
        console.log(data);
        if (data) {
          this.router.navigateByUrl('/home');
        } else {
          console.log(data);
        }
      }, error => {
        console.log(error);
      });
    }
  }
}
