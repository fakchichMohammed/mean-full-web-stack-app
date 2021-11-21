import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postCreated: Post ;
  title = new FormControl('', [Validators.required]);
  content = new FormControl('', [Validators.required]);

  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm) {
   if (form.invalid) {
     return;
   }
   this.postService.addPost(form.value.title, form.value.content);
   form.resetForm();
  }

  

}
