import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WorkplaceElementModel} from '../../../../models/workplacemodels/workplaceelement.model';
import {NoteModel} from '../../../../models/workplacemodels/note.model';
import {ThreadModel} from '../../../../models/workplacemodels/thread.model';
import {Store} from '@ngxs/store';
import {AddWorkplaceElement} from '../../../../store/workplace-element';

@Component({
  selector: 'app-note-thread-dialog',
  templateUrl: './note-thread-dialog.component.html',
  styleUrls: ['./note-thread-dialog.component.css']
})
export class NoteThreadDialogComponent implements OnInit {
  type: string;
  element: ThreadModel | NoteModel;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private store: Store) { }

  ngOnInit(): void {
    this.type = this.data.type;
    if (this.type === 'Note') {
      this.element = this.data?.object as NoteModel;
    } else {
      this.element = this.data?.object as ThreadModel;
    }
  }

  createElement(form: NgForm): void {
    if (this.type === 'Note') {
      this.store.dispatch(new AddWorkplaceElement(
        new NoteModel(
          form.value.name,
          form.value.description
        ))
      );
    } else {
      this.store.dispatch(new AddWorkplaceElement(
        new ThreadModel(
          form.value.name,
          form.value.description
        ))
      );
    }
  }
}
