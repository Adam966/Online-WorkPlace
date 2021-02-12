import {Component, Input, OnInit} from '@angular/core';
import { UserModel} from '../../models/application-models/user.model';
import {USER_PHOTO} from '../../services/url_const';

@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
  styleUrls: ['./user-label.component.css']
})
export class UserLabelComponent implements OnInit {
  @Input()
  user: UserModel;

  showImage = true;
  initials: string;
  photo: string;

  constructor() {}

  ngOnInit(): void {
    if (this.user.photo) {
      this.showImage = true;
      this.photo = USER_PHOTO + this.user.id.toString();
    } else {
      this.showImage = false;
      this.initials = this.user.userName.charAt(0) + this.user.userSurname.charAt(0);
      this.photo = '';
    }
  }
}
