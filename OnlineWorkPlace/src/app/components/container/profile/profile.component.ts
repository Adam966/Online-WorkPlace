import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SetApplicationToolbarTitle} from '../../../store/application';
import {USER_PHOTO} from '../../../services/url_const';
import {Select} from '@ngxs/store';
import {LoginState} from '../../../store/login';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  image = '';
  photoUrl: string;

  @Select(LoginState.userId)
  userId$: Observable<number>;
  userId: number;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
   this.userId$.subscribe(data => this.photoUrl = USER_PHOTO + data);
  }

  choosePhoto(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.image = this.sanitizeUrl(event);
    };
  }

  sanitizeUrl(event: ProgressEvent<FileReader>): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result.toString());
  }

  changeUserPhoto(image: string): void {
    // TODO change user image
  }

  @Dispatch()
  setApplicationTitle(): SetApplicationToolbarTitle {
    return new SetApplicationToolbarTitle('Profile Settings');
  }
}
