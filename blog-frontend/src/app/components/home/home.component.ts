import { Component, OnInit } from '@angular/core';
import { PostPayload } from '../new-post/post-payload';
import { PostsService } from 'src/app/service/posts/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: PostPayload[];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getAllPosts().subscribe(data => {
      console.log("fetched " + data.length + " posts");
      this.posts = data;
    });


  }

}
