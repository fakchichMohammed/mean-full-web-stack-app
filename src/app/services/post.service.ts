import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "../models/post.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class PostService {
  private apiUrl: string = "http://localhost:3000/api/posts";
  private Posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) { }

  public getPosts() {
    this.httpClient
      .get<{ message: string, posts: any }>(this.apiUrl)
      .pipe(map(postData => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPost => {
        this.Posts = transformedPost;
        this.postUpdated.next([...this.Posts]);
      });
  }

  public addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content
    };

    this.httpClient
      .post<{ message: string, postId: string }>(this.apiUrl, post)
      .subscribe(responseData => {
        post.id = responseData.postId;
        this.Posts.push(post);
        this.postUpdated.next([...this.Posts]);
      });
  }

  public deletePost(postId: string) {
    this.httpClient
      .delete(this.apiUrl + '/' + postId)
      .subscribe(() => {
        this.Posts = this.Posts.filter(post => post.id !== postId);
        this.postUpdated.next([...this.Posts]);
      });
  }

  public getPostUpdateObservable() {
    return this.postUpdated.asObservable();
  }


}
