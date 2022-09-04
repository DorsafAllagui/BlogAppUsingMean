import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../post.model';
import { SearchFilterPipe } from './search-filter.pipe';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  searchText;

  private authListenerSubs: Subscription;
  vote :any;
  upvoted: false;
  downvoted: false;
  posts: Post[] = [];
  user: Post[] = []
  postbyUser: Post[] = []
  isloading = false;
  error: any
  userId: string
  private postsSub: Subscription;
  post:Observable<any>
text:string
noOfLikes: number = 0;
  noOfDisLikes: number = 0;
  likeClass = ['like-button'];
  likeState: string = '';
  disvote: any;

  constructor(private ps: PostService) { 
  
  }

  ngOnInit(): void {
    this.getErrors();
    this.isloading = true;
    this.ps.getPosts();
    this.postsSub = this.ps.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.isloading = false;
      this.posts = posts;
    }, e => {
      this.isloading = false;
      this.error = e
    });
    
    
  }
  
  incrementLike(button:any) {
    button.upvote +=  1;
  
    // if(this.likeState == "disliked")
    // this.likeClass.push('liked');
  }

  incrementDisLike(button) {
   
    this.disvote=button;
        button.upvote +=  1;
     
    // this.likeState = 'dislikesd';
    // this.noOfDisLikes = this.noOfDisLikes + 1;
  }
  voteQuote(quote:any,type:number){
    this.ps.voteQuote(quote,type);
  }

 
  getErrors() {
    this.error = null
    this.ps.err.subscribe(err => {
      this.error = err
      this.isloading = false
    })
  }
ngOnDestroy() {

  }

  deletePost(post){
this.ps.deletePost(post.id)
  }

}



