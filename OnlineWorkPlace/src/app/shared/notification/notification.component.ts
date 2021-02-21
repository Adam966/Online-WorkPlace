import {Component, Input, OnInit} from '@angular/core';
import {NotificationModel} from '../../models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input()
  notification: NotificationModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
