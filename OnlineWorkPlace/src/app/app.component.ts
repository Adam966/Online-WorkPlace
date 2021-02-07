import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SetApplicationLoadingState} from './store/application';
import {LoginState} from './store/login';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {MessageState} from './store/message-pop-up';
import {MessageModel} from './models/application-models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OnlineWorkPlace';

  @Select(LoginState.token)
  isLoggedIn$!: Observable<string>;

  @Select(MessageState.isVisible)
  isMessageVisible$!: Observable<boolean>;

  @Select(MessageState.message)
  message$!: Observable<MessageModel>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$.subscribe(token => {
      if (token) {
        this.router.navigate(['main']);
      }
    });

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
