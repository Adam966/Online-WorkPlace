import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {WorkplaceElementModel} from '../../../models/workplacemodels/workplaceelement.model';
import {WorkplaceElementApiService} from '../../../services/workplace-element-api/workplace-element-api.service';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {WorkplaceElementState} from '../../../store/workplace-element';
import {NoteModel} from '../../../models/workplacemodels/note.model';
import {ThreadModel} from '../../../models/workplacemodels/thread.model';
import {NoteThreadDialogComponent} from './create-dialog/note-thread-dialog/note-thread-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ChecklistDialogComponent} from './create-dialog/checklist-dialog/checklist-dialog.component';
import {ChecklistModel} from '../../../models/workplacemodels/checklist.model';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {
  ApplicationState,
  SetApplicationToolbarState,
  SetApplicationToolbarTitle,
  SetApplicationWorkplace
} from '../../../store/application';
import {ActivatedRoute} from '@angular/router';
import {WORKPLACE_PHOTO} from '../../../services/url_const';
import {LoginState} from '../../../store/login';
import {SseNotificationApiService} from '../../../services/sse-notification-api/sse-notification-api.service';
import {WorkplaceSettingsState} from '../../../store/workplace-settings';
import {NotificationRightsModel} from '../../../models/rights-model/notification-rights.model';

@Component({
  selector: 'app-workplace-screen',
  templateUrl: './workplace-screen.component.html',
  styleUrls: ['./workplace-screen.component.css']
})
export class WorkplaceScreenComponent implements OnInit, OnDestroy {
  @Select(WorkplaceElementState)
  workPlaceElements$: Observable<WorkplaceElementModel[]>;

  @Select(LoginState.userId)
  private userId$: Observable<number>;
  userId: number;

  @Select(ApplicationState.currentWorkplaceId)
  private workplaceId$: Observable<number>;
  workplaceId: number;

  @Select(WorkplaceSettingsState.notificationsRights)
  notificationRights$!: Observable<NotificationRightsModel>;

  workplaceConfig: { workplacePhoto: number, colorOfElement: string, workplaceBackground: string };
  url = WORKPLACE_PHOTO;

  constructor(
    private elementApiService: WorkplaceElementApiService,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private sseNotificationService: SseNotificationApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.workplaceId$.subscribe(workplaceId => this.workplaceId = workplaceId);
    this.userId$.subscribe(userId => this.userId = userId);

    // TODO wtf is this??
    this.workplaceConfig = window.history.state as { workplacePhoto: number, colorOfElement: string, workplaceBackground: string };
    if (!this.workplaceConfig?.workplacePhoto) {
      this.url = '#';
    }
  }

  ngOnInit(): void {
    this.setApplicationWorkplace();
    this.changeToolbarStatus();
    // this.setApplicationTitle();
    this.notificationRights$.subscribe(rights => {
      this.sseNotificationService.startSseNotificationsStream(this.workplaceId, this.userId, rights);
    });
  }

  openEditDialog(element: WorkplaceElementModel, i: number): void {
    let dialogRef: MatDialogRef<any>;
    if (element.type === 'checklist') {
      dialogRef = this.dialog.open(ChecklistDialogComponent, {
        data: {
          object: element as ChecklistModel,
          index: i
        },
        panelClass: 'dialogStyle'
      });
    } else if (element.type === 'note') {
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
      .subscribe(() => this.cdr.detectChanges());
  }

  @Dispatch()
  changeToolbarStatus(): SetApplicationToolbarState {
    return new SetApplicationToolbarState(true);
  }

  @Dispatch()
  setApplicationWorkplace(): SetApplicationWorkplace {
    return new SetApplicationWorkplace(this.activeRoute.snapshot.paramMap.get('workplaceId'));
  }

  ngOnDestroy(): void {
    this.sseNotificationService.stopNotificationsStream();
  }

  // @Dispatch()
  // setApplicationTitle(): SetApplicationToolbarTitle {
  //   return new SetApplicationToolbarTitle('Online workplace');
  // }
}
