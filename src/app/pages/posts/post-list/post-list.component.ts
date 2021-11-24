import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/apis/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateObservable().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  onDelete(postId: string) {    
    this.postService.deletePost(postId);
  }

}
