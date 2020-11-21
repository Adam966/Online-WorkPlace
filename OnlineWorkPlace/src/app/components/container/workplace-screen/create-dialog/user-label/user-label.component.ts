import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../../../models/user.model';

@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
  styleUrls: ['./user-label.component.css']
})
export class UserLabelComponent implements OnInit {
  @Input()
  user: UserModel;

  constructor() { }

  ngOnInit(): void {
  }

}
