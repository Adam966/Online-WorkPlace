import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-note-thread-dialog',
  templateUrl: './note-thread-dialog.component.html',
  styleUrls: ['./note-thread-dialog.component.css']
})
export class NoteThreadDialogComponent implements OnInit {
  public type: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.type = this.data.type;
  }

  createElement(form: NgForm): void {
    if (this.type === 'Note') {
      console.log('Create Note');
    } else {
      console.log('Create Thread');
    }
  }
}
