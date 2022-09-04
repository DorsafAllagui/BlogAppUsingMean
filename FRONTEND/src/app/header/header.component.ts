import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  profile: any;
  username: string
  profileisSet = false
  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {


  
  }




  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
