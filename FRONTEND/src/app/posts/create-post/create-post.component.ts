import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mimeType } from './mime-type.validator';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postdate: Date
  fetchedDate: Date
  form: FormGroup;
  isLoading: boolean = false
  imagePreview: string
  post: Post;
  private mode = "create";
  private postId: string;
  constructor(
    private ps: PostService,
    public route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    //this.checkProfileCreated()
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";

        this.postId = paramMap.get("postId");
        this.getPostById(this.postId)
      }
      else {
        this.mode = "create";
        this.postId = null;

      }
    })
    this.createForm()
  }

  getPostById(id) {
    
    this.isLoading=true
    this.ps.getPost(id).subscribe(postData => {
      postData.upvote
    
      this.post = {
        id: postData._id,
        title: postData.title,
        content: postData.content,
        author: postData.author
      };
     
      this.form.setValue({
        title: this.post.title,
        content: this.post.content,
        author: this.post.author
      });
      this.isLoading = false;
    });

  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      author: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { 
        validators: [Validators.required,Validators.minLength(3)] }),
       
     
    });
  }
  

 

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.ps.addPost(
        this.form.value
      );
    }
    else {
      this.ps.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.author,
        0,
        0
    );
    }
    this.form.reset();
  }

  
}


