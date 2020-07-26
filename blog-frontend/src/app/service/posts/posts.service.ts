import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostPayload } from 'src/app/components/new-post/post-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsURL = "http://localhost:8080/api/posts/"

  constructor(private httpClient: HttpClient) { }

  uploadNewPost(postPayload: PostPayload): Observable<any> {
    return this.httpClient.post(`${this.postsURL}new`, postPayload);
  }

  getAllPosts(): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>(this.postsURL);
  }

  getSinglePost(id: number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>(`${this.postsURL}${+id}`);
  }

  deletePost(id: number): Observable<any> {
    return this.httpClient.delete(`${this.postsURL}delete/${+id}`);
  }
}
