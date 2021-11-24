import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "../../models/post.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private apiUrl: string = "http://localhost:3000/api/posts/";
  private Posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  public getPosts() {
    this.httpClient
      .get<{ message: string; posts: any }>(this.apiUrl)
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(transformedPost => {
        this.Posts = transformedPost;
        this.postsUpdated.next([...this.Posts]);
      });
  }

  public getPost(postId: string) {
    return this.httpClient.get<{_id: string, title: string, content: string}>(this.apiUrl + postId);
  }

  public addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content
    };
    this.httpClient
      .post<{ message: string; postId: string }>(this.apiUrl, post)
      .subscribe(responseData => {
        post.id = responseData.postId;
        this.Posts.push(post);
        this.postsUpdated.next([...this.Posts]);
      });
  }

  public deletePost(postId: string) {
    this.httpClient.delete(this.apiUrl + postId).subscribe(() => {
      this.Posts = this.Posts.filter(post => post.id !== postId);
      this.postsUpdated.next([...this.Posts]);
    });
  }

  public updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content
    };
    this.httpClient.put(this.apiUrl + id, post).subscribe(response => {
      const updatedPosts = [...this.Posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.Posts = updatedPosts;
      this.postsUpdated.next([...this.Posts]);
    });
  }

  public getPostUpdateObservable() {
    return this.postsUpdated.asObservable();
  }
}
