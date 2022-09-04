import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';




const routes: Routes = [
  { path: '', component: PostListComponent },
  
  { path: 'create', component: CreatePostComponent },

  { path: ':postId', component: PostDetailComponent },
  { path: 'edit/:postId', component: CreatePostComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
