import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NoteThreadDialogComponent} from './workplace-screen/create-dialog/note-thread-dialog/note-thread-dialog.component';
import {ChecklistDialogComponent} from './workplace-screen/create-dialog/checklist-dialog/checklist-dialog.component';
import {Select} from '@ngxs/store';
import {ApplicationState} from '../../store/application';
import {Observable} from 'rxjs';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {LoginState, Logout} from '../../store/login';
import {MessageState} from '../../store/message-pop-up';
import {MessageModel} from '../../models/application-models/message.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Select(ApplicationState.isLoading)
  isLoading$!: Observable<boolean>;

  @Select(ApplicationState.toolbarState)
  toolbarState$!: Observable<boolean>;

  @Select(MessageState.isVisible)
  isMessageVisible$!: Observable<boolean>;

  @Select(MessageState.message)
  message$!: Observable<MessageModel>;

  @Select(LoginState.userId)
  userId$!: Observable<number>;
  userId: number;

  @Select(ApplicationState.toolbarTitle)
  toolbarTitle$!: Observable<string>;

  @Select(ApplicationState.currentWorkplaceId)
  currentWorkplaceId$!: Observable<string>;
  private currentWorkplaceId: string;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentWorkplaceId$.subscribe(data => {
      this.currentWorkplaceId = data;
    });

    // TODO check if parameter working properly with different userId
    this.userId$.subscribe(userId => {
      this.userId = userId;
      this.router.navigate(
        ['workplace'],
        {
          relativeTo: this.route,
          queryParams: { userId },
          queryParamsHandling: 'merge'
        }
      );
    });
  }

  createDialog(type: string): void {
    this.dialog.open(NoteThreadDialogComponent, {
      data: {
        type
      }
    });
  }

  createTaskDialog(): void {
    this.dialog.open(ChecklistDialogComponent);
  }

  @Dispatch()
  logout(): Logout {
    return new Logout();
  }

  navigateStorage(): void {
    this.router.navigate(
      ['main/workplace/' + this.currentWorkplaceId + '/storage'],
    );
  }

  navigateSettings(): void {
    this.router.navigate(
      ['main/workplace/' + this.currentWorkplaceId + '/settings']
    );
  }
}
