import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment'
const BACKEND_URL = environment.apiUrl + "/posts"
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
 
  private postsUpdated = new Subject<Post[]>();
  public err = new BehaviorSubject<any>(null);
  constructor(
    private http: HttpClient, private router: Router
  ) { }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
voteQuote(quote:Post,type:number){ if(this.getPostUpdateListener().subscribe((posts: Post[]) => {
  console.log(type)
  this.posts = posts}),
  
  this.posts.indexOf(quote) >= 0){
  
  type === 0 ? this.posts[this.posts.indexOf(quote)].upvote++ : this.posts[this.posts.indexOf(quote)].downvote++;
  
  
}

}
  addPost(post: Post) {
    
  console.log(post)
  post.upvote=0;
  post.downvote=0; 
  console.log(post)
   return  this.http
      .post<{ message: string;}>(
        BACKEND_URL,
        {title: post.title,
          content: post.content,
          author: post.author,
          upvote: post.upvote,
          downvote: post.downvote,
        }
      )
      .subscribe(responseData => {
        this.err.next(null)
        this.router.navigate(["/"]);


      }),
      err => {
        this.err.next(err)
      }
  }

  getPosts()
   {
     return this.http.get<{ message: string; posts: any }>(BACKEND_URL)
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            author: post.author,
            upvote: post.upvote,
            downvote: post.downvote
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.err.next(null)

        this.posts = transformedPosts;
       return this.postsUpdated.next([...this.posts]);
        
      });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string, title: string, content: string, author: string,upvote:number,downvote:number
    }>(
      BACKEND_URL +"/" + id
    );
  }

  getMyPost(id: string) {
    this.http.get<{ message: string; posts: any }>(
      BACKEND_URL + "/mypost"
    ).pipe(
      map(postData => {
        return postData.posts.map(post => {
          post.upvote=0;
          post.downvote=0;
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            author: post.author,
            upvote:post.upvote,
          downvote:post.downvote,
          };
        });
      })
    )
      .subscribe(transformedPosts => {
        this.err.next(null)

        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      },
        err => {
          this.err.next(err)
        });
  }


  updatePost(id: string, title: string, content: string, author: string,upvote:number,downvote) {
   
    console.log(title)
    
    this.http
      .put(BACKEND_URL + "/" +id, {
        title: title,
        content: content,
        id: id,
        author: author,
        upvote:upvote,
      downvote:downvote,
      })
      .subscribe(response => {
        this.err.next(null)
        this.router.navigate(["/"]);

      },
        err => {
          this.err.next(err)
        });
  }

  deletePost(postId: string) {
    console.log(postId)
    this.http
  
      .delete(BACKEND_URL +"/"+ postId)
      .subscribe((data) => {

        this.err.next(null)
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);


      },
        e => {
          this.err.next(e)

        });

  }
}
