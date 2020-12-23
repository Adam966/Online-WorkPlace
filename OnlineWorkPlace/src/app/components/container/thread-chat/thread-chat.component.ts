import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread-chat',
  templateUrl: './thread-chat.component.html',
  styleUrls: ['./thread-chat.component.css']
})
export class ThreadChatComponent implements OnInit {
  messages = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  constructor() { }

  ngOnInit(): void {
  }

}
