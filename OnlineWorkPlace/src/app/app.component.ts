import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SetApplicationLoadingState} from './store/application';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OnlineWorkPlace';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isUserLoggedIn();

    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  @Dispatch()
  loadingStart(): SetApplicationLoadingState {
    return new SetApplicationLoadingState(true);
  }

  @Dispatch()
  loadingEnd(): SetApplicationLoadingState {
    return new SetApplicationLoadingState(false);
  }

  private isUserLoggedIn(): void {
    this.router.navigateByUrl('main/workplace');
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loadingStart();
    }
    if (event instanceof NavigationEnd) {
      this.loadingEnd();
    }
    if (event instanceof NavigationCancel) {
      this.loadingEnd();
    }
    if (event instanceof NavigationError) {
      this.loadingEnd();
    }
  }

}
