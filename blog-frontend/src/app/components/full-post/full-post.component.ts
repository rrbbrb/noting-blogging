import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/service/posts/posts.service';
import { PostPayload } from '../new-post/post-payload';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css']
})
export class FullPostComponent implements OnInit {

  id: number;
  post: PostPayload;

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.postsService.getSinglePost(this.id).subscribe(data => {
      this.post = data;
    })
  }

  onDeletePost(): any {
    return this.postsService.deletePost(this.id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}
