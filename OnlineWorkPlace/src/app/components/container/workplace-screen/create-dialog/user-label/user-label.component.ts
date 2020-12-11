import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../../models/user.model';

@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
  styleUrls: ['./user-label.component.css']
})
export class UserLabelComponent implements OnInit {
  @Input()
  user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
