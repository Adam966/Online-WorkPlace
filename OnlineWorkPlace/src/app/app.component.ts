import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
  }

  private isUserLoggedIn(): void {
    this.router.navigateByUrl('main/workplace');
  }
}
