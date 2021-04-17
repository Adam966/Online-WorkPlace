import {Component, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SetApplicationToolbarTitle} from '../../../store/application';
import {USER_PHOTO} from '../../../services/url_const';
import {Select} from '@ngxs/store';
import {LoginState} from '../../../store/login';
import {Observable} from 'rxjs';
import {UserModel} from '../../../models/application-models/user.model';
import {LoginApiService} from '../../../services/login-api/login-api.service';
import {switchMap} from 'rxjs/operators';
import {UtilsMessage} from '../../../shared/utils/utils-message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('currentEmail')
  input: HTMLInputElement;

  image = '';
  photoUrl: string;

  @Select(LoginState)
  user$!: Observable<UserModel>;

  constructor(private sanitizer: DomSanitizer, private loginApiService: LoginApiService) {
  }

  ngOnInit(): void {
   this.user$.subscribe((data) => {
     if (data.photo) {
       this.photoUrl = USER_PHOTO + data.photo;
     }
   });
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

  updateEmail(email: string): void {
    this.user$.pipe(
      switchMap((user) => this.loginApiService.updateEmail(user.id, email))
    ).subscribe(() => {
      this.input.value = email;
      UtilsMessage.showMessage(UtilsMessage.EMAIL_CHANGED_SUCCESSFULLY, UtilsMessage.MESSAGE_STATUS_POSITIVE);
    }, () => {
      UtilsMessage.showMessage(UtilsMessage.MESSAGE_UNEXPECTED_ERROR, UtilsMessage.MESSAGE_STATUS_ERROR);
    });
  }
}
