import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NewPostPayload } from './new-post-payload';
import { PostsService } from 'src/app/service/posts/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup;
  newPostPayload: NewPostPayload;
  selectedFile: File = null;
  validFile: boolean = false;

  constructor(private postsService: PostsService, private router: Router) {
    this.newPostForm = new FormGroup({
      title: new FormControl(),
      coverPhoto: new FormControl(),
      bodyText: new FormControl()
    });
    this.newPostPayload = {
      title: '',
      coverPhoto: null,
      bodyText: ''
    }
  }

  ngOnInit(): void { }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const fileSizeInMB = +this.selectedFile.size / 1024 / 1024;
    const validFileType = this.selectedFile.type == "image/jpeg" || this.selectedFile.type == "image/png";
    if (fileSizeInMB <= 2 && validFileType) {
      this.validFile = true;
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit() {
    const formData = null;

    if(this.validFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.newPostPayload.title = this.newPostForm.get('title').value;
    this.newPostPayload.coverPhoto = formData;
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

  // TODO: Invalid file warning pop up
  // TODO: Discard button to navigate away and reset form

}
