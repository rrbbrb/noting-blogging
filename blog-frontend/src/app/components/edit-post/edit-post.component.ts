import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostPayload } from '../new-post/post-payload';
import { PostsService } from 'src/app/service/posts/posts.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./../new-post/new-post.component.css']
})
export class EditPostComponent implements OnInit {

  id: number;
  updatePostForm: FormGroup;
  fetchedPostPayload: PostPayload;
  updatePostPayload: PostPayload;  

  constructor(private postsService: PostsService, private router: Router, private route: ActivatedRoute) {
    this.postsService.currentPost.subscribe(post => this.fetchedPostPayload = post);
    this.updatePostForm = new FormGroup({
      title: new FormControl(this.fetchedPostPayload.title),
      bodyText: new FormControl(this.fetchedPostPayload.bodyText)
    });
    this.updatePostPayload = {
      id: null,
      title: '',
      bodyText: '',
      user: null,
      dateCreated: null,
      lastUpdated: null
    }
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  onSubmit() {
    this.updatePostPayload.title = this.updatePostForm.get('title').value;
    this.updatePostPayload.bodyText = this.updatePostForm.get('bodyText').value;

    this.postsService.updatePost(this.id, this.updatePostPayload).subscribe(data => {
      console.log(data);
      if (data) {
        console.log("Post updated");
        this.router.navigateByUrl(`/post/${this.id}`);
      } else {
        console.log("Post not updated");
      }
    });
  }

}
