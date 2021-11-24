import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/apis/services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  postCreated: Post;
  post: Post;
  title = new FormControl('', [Validators.required]);
  content = new FormControl('', [Validators.required]);
  private mode = 'CREATE';
  private postId: string;

  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'EDIT';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          }
        });
      } else {
        this.mode = 'CREATE';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
   if (form.invalid) {
     return;
   }
   if (this.mode === 'CREATE') {
     this.postService.addPost(form.value.title, form.value.content);
   } else {
     this.postService.updatePost(this.postId, form.value.title, form.value.content);
   }
   
   form.resetForm();
  }

  

}
