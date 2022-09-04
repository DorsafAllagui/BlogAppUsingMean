import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { PostService } from './services/post.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import {StoreModule} from '@ngrx/store';
import { FooterComponent } from './footer/footer.component';
import { SearchFilterPipe } from './posts/post-list/search-filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    CreatePostComponent,
    SpinnerComponent,
    PostDetailComponent,
    FooterComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PostService,
   
  ],  exports: [SearchFilterPipe],

  bootstrap: [AppComponent],
})
export class AppModule { }
