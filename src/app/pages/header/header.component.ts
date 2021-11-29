import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/apis/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.auth.getIsAuth();
    this.authListenerSubs = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
