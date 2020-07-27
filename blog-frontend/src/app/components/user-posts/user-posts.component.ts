import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/service/posts/posts.service';
import { PostPayload } from '../new-post/post-payload';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./../home/home.component.css']
})
export class UserPostsComponent implements OnInit {

  username: string;
  posts: PostPayload[];

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.postsService.getAllPostsByUser(this.username).subscribe(data => {
      console.log("fetched " + data.length + " posts by " + this.username);
      this.posts = data;
    });
  }

}
