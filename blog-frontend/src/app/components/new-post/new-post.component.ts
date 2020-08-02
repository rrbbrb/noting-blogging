import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostPayload } from './post-payload';
import { PostsService } from 'src/app/service/posts/posts.service';
import { Router } from '@angular/router';
import { bufferToggle } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup;
  newPostPayload: PostPayload;  

  constructor(private postsService: PostsService, private router: Router, private translateService: TranslateService) {
    this.newPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      bodyText: new FormControl('', Validators.required)
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
    let confirmDiscard: string;
    this.translateService.get('posts.confirmDiscard').subscribe(translation => {
      confirmDiscard = translation;
    });
    if(window.confirm(confirmDiscard)) {
      this.router.navigateByUrl('/home');
    }
  }

}
