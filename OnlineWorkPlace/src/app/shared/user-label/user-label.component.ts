import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/application-models/user.model';
import {USER_PHOTO} from '../../services/url_const';

@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
  styleUrls: ['./user-label.component.css']
})
export class UserLabelComponent implements OnInit {
  @Input()
  user: User;

  showImage = true;
  initials: string;
  photo: string;

  constructor() {}

  ngOnInit(): void {
    if (this.user.photo !== 0) {
      this.showImage = true;
      this.photo = USER_PHOTO + this.user.photo.toString();
    } else {
      this.showImage = false;
      this.initials = this.user.username.charAt(0) + this.user.usersurname.charAt(0);
      this.photo = '';
    }
  }
}
