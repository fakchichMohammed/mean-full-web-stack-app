import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "../models/post.model";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private apiUrl: string = "http://localhost:3000/api/posts";
  private Posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  public getPosts() {
    this.httpClient
      .get<{
        message: string;
        posts: Post[];
      }>(this.apiUrl)
      .subscribe(postData => {
        this.Posts = postData.posts;
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
      .post<{
        message: string;
      }>(this.apiUrl, post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.Posts.push(post);
        this.postUpdated.next([...this.Posts]);
      });
  }

  public getPostUpdateObservable() {
    return this.postUpdated.asObservable();
  }
}
