import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostPayload } from 'src/app/components/new-post/post-payload';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postForEdit = new BehaviorSubject<PostPayload>({
    id: null,
    title: '',
    bodyText: '',
    user: null,
    dateCreated: null,
    lastUpdated: null
  });
  currentPost = this.postForEdit.asObservable();

  private postsURL = "http://localhost:8080/api/posts/"

  constructor(private httpClient: HttpClient) { }

  injectPost(postPayload: PostPayload) {
    this.postForEdit.next(postPayload);
  }

  uploadNewPost(postPayload: PostPayload): Observable<any> {
    return this.httpClient.post(`${this.postsURL}new`, postPayload);
  }

  getAllPosts(): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>(this.postsURL);
  }

  getSinglePost(id: number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>(`${this.postsURL}${+id}`);
  }

  getAllPostsByUser(username: string): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>(`${this.postsURL}user/${username}`);
  }

  deletePost(id: number): Observable<any> {
    return this.httpClient.delete(`${this.postsURL}delete/${+id}`);
  }

  updatePost(id: number, updatedPostPayload: PostPayload): Observable<any> {
    return this.httpClient.put(`${this.postsURL}edit/${+id}`, updatedPostPayload);
  }
}
