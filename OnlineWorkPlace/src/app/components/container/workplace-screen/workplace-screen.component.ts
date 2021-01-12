import {Component, OnInit} from '@angular/core';
import {WorkplaceElementModel} from '../../../models/workplacemodels/workplaceelement.model';
import {WorkplaceElementApiService} from '../../../services/workplace-element-api/workplace-element-api.service';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import { WorkplaceElementState} from '../../../store/workplace-element';
import {NoteModel} from '../../../models/workplacemodels/note.model';
import {ThreadModel} from '../../../models/workplacemodels/thread.model';
import {NoteThreadDialogComponent} from './create-dialog/note-thread-dialog/note-thread-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ChecklistDialogComponent} from './create-dialog/checklist-dialog/checklist-dialog.component';
import {ChecklistModel} from '../../../models/workplacemodels/checklist.model';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {
  SetApplicationToolbarState,
  SetApplicationToolbarTitle,
  SetApplicationWorkplace
} from '../../../store/application';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-workplace-screen',
  templateUrl: './workplace-screen.component.html',
  styleUrls: ['./workplace-screen.component.css']
})
export class WorkplaceScreenComponent implements OnInit {
  @Select(WorkplaceElementState)
  workPlaceElements$: Observable<WorkplaceElementModel[]>;

  constructor(
    private elementApiService: WorkplaceElementApiService,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setApplicationWorkplace();
    this.changeToolbarStatus();
    this.setApplicationTitle();
  }

  openEditDialog(element: WorkplaceElementModel, i: number): void {
    let dialogRef: MatDialogRef<any>;
    if (element.hasOwnProperty('tasks')) {
      dialogRef = this.dialog.open(ChecklistDialogComponent, {
        data: {
          object: element as ChecklistModel,
          index: i
        },
        panelClass: 'dialogStyle'
      });
    } else if (element.hasOwnProperty('dueDate')) {
      dialogRef = this.dialog.open(NoteThreadDialogComponent, {
        data: {
          type: 'Note',
          object: element as NoteModel,
          index: i
        },
        panelClass: 'dialogStyle'
      });
    } else {
      dialogRef = this.dialog.open(NoteThreadDialogComponent, {
        data: {
          type: 'Thread',
          object: element as ThreadModel,
          index: i
        },
        panelClass: 'dialogStyle'
      });
    }

    dialogRef.afterClosed()
      .subscribe();
  }

  @Dispatch()
  changeToolbarStatus(): SetApplicationToolbarState {
    return new SetApplicationToolbarState(true);
  }

  @Dispatch()
  setApplicationWorkplace(): SetApplicationWorkplace {
    return new SetApplicationWorkplace(this.activeRoute.snapshot.paramMap.get('workplaceId'));
  }

  @Dispatch()
  setApplicationTitle(): SetApplicationToolbarTitle {
    return new SetApplicationToolbarTitle('Online workplace');
  }
}
