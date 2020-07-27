import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostPayload } from './post-payload';
import { PostsService } from 'src/app/service/posts/posts.service';
import { Router } from '@angular/router';
import { bufferToggle } from 'rxjs/operators';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

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

  dropDraft() {
    if(window.confirm("Are you sure to discard this post?")) {
      this.router.navigateByUrl('/home');
    }
  }

}
