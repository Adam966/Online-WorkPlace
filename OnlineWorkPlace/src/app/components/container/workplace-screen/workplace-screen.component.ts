import {Component, OnInit} from '@angular/core';
import {WorkplaceElementModel} from '../../../models/workplacemodels/workplaceelement.model';
import {WorkplaceElementApiService} from '../../../services/workplace-element-api/workplace-element-api.service';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {GetWorkplacesElements, WorkplaceElementState} from '../../../store/workplace-element';
import {NoteModel} from '../../../models/workplacemodels/note.model';
import {ThreadModel} from '../../../models/workplacemodels/thread.model';
import {NoteThreadDialogComponent} from './create-dialog/note-thread-dialog/note-thread-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ChecklistDialogComponent} from './create-dialog/checklist-dialog/checklist-dialog.component';
import {ChecklistModel} from '../../../models/workplacemodels/checklist.model';

@Component({
  selector: 'app-workplace-screen',
  templateUrl: './workplace-screen.component.html',
  styleUrls: ['./workplace-screen.component.css']
})
export class WorkplaceScreenComponent implements OnInit {
  @Select(WorkplaceElementState)
  workPlaceElements$: Observable<WorkplaceElementModel[]>;

  constructor(private elementApiService: WorkplaceElementApiService, private store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(new GetWorkplacesElements(1));
  }

  openEditDialog(element: WorkplaceElementModel): void {
    if (element.hasOwnProperty('tasks')) {
      this.dialog.open(ChecklistDialogComponent, {
        data: {
          object: element as ChecklistModel
        }
      });
    } else if (element.hasOwnProperty('dueDate')) {
      this.dialog.open(NoteThreadDialogComponent, {
        data: {
          type: 'Note',
          object: element as NoteModel
        }
      });
    } else {
      this.dialog.open(NoteThreadDialogComponent, {
        data: {
          type: 'Thread',
          object: element as ThreadModel
        }
      });
    }
  }
}
