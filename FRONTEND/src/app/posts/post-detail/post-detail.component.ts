import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostService } from '../../services/post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  
  isloading = false;
  url: string
  error: any
  postId: string;
  post: Post;
  userId: String;
  userIsAuthenticated: boolean
  private authStatusSub: Subscription;
  profile: any

  constructor(
    public postsService: PostService,
    public route: ActivatedRoute,
    public router: Router,
  
  ) { }

  ngOnInit(): void {
    this.url = this.router.url.split("/")[1]
    
  
    this.getErrors()

    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has("postId")) {
        this.postId = paramMap.get("postId");
        this.getPostById(this.postId)
      }
    })
  }


  getErrors() {
    this.error = null
    this.postsService.err.subscribe(err => {
      this.error = err
      this.isloading = false

    })

  }
  deletePost(post){
    this.postsService.deletePost(post.id)
      }

  getPostById(id) {
    this.isloading = true
    this.postsService.getPost(this.postId).subscribe(postData => {
      console.log(postData)
      this.post = {
        id: postData._id,
        title: postData.title,
        content: postData.content,
        author: postData.author
      };
    
      this.isloading = false
    })
    e => {
      this.isloading = false
      this.error = e
    }
  }



  OnDelete(postId: string) {
    this.postsService.deletePost(postId);
  }


}
