import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostPayload } from '../new-post/post-payload';
import { PostsService } from 'src/app/service/posts/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./../new-post/new-post.component.css']
})
export class EditPostComponent implements OnInit {

  newPostForm: FormGroup;
  newPostPayload: PostPayload;  

  constructor(private postsService: PostsService, private router: Router) {
    this.newPostForm = new FormGroup({
      title: new FormControl(),
      bodyText: new FormControl()
    });
    this.newPostPayload = {
      id: null,
      title: '',
      bodyText: '',
      user: null,
      dateCreated: null,
      lastUpdated: null
    }
  }

  ngOnInit(): void { }

  onSubmit() {
    this.newPostPayload.title = this.newPostForm.get('title').value;
    this.newPostPayload.bodyText = this.newPostForm.get('bodyText').value;

    this.postsService.uploadNewPost(this.newPostPayload).subscribe(data => {
      console.log(data);
      if (data) {
        console.log("New post added");
        this.router.navigateByUrl('/home');
      } else {
        console.log("New post not added");
      }
    });
  }

}
