import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewPostPayload } from 'src/app/components/new-post/new-post-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsURL = "http://localhost:8080/api/posts/"

  constructor(private httpClient: HttpClient) { }

  uploadNewPost(newPostPayload: NewPostPayload): Observable<any> {
    return this.httpClient.post(`${this.postsURL}new`, newPostPayload);
  }
}
