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
import {LabelModel} from '../../models/application-models/label.model';
import {WorkplaceSettingsState} from '../../store/workplace-settings';
import {DefaultElements, SortElements} from '../../store/workplace-element';
import {AddLabelComponent} from './workplace-settings/add-label/add-label/add-label.component';
import {AddUserComponent} from './workplace-settings/add-user/add-user/add-user.component';

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

  @Select(LoginState.userId)
  userId$!: Observable<number>;
  userId: number;

  @Select(ApplicationState.currentWorkplaceId)
  workplaceId$: Observable<string>;
  workplaceId: string;

  @Select(ApplicationState.toolbarTitle)
  toolbarTitle$!: Observable<string>;

  @Select(ApplicationState.currentWorkplaceId)
  currentWorkplaceId$!: Observable<string>;
  private currentWorkplaceId: string;

  @Select(WorkplaceSettingsState.labels)
  labels$: Observable<LabelModel[]>;

  input: string;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currentWorkplaceId$.subscribe(data => {
      this.currentWorkplaceId = data;
    });

    // TODO check if parameter working properly with different userId
    this.userId$.subscribe(userId => {
      this.userId = userId;
      this.navigateToHome(userId);
    });

    this.workplaceId$.subscribe(id => this.workplaceId = id);
  }

  navigateToHome(userId: number): void {
    this.router.navigate(
      ['workplace'],
      {
        relativeTo: this.route,
        queryParams: {userId},
        queryParamsHandling: 'merge'
      }
    );
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

  navigate(path: string): void {
    this.router.navigate(
      [`main/workplace/${this.currentWorkplaceId}/${path}`]
    );
  }

  navigateProfile(): void {
    this.router.navigate(
      [`main/profile`]
    );
  }

  @Dispatch()
  logout(): Logout {
    return new Logout();
  }

  @Dispatch()
  sortElements(value: string): SortElements {
    return new SortElements(value);
  }

  @Dispatch()
  removeSort(): DefaultElements {
    this.input = '';
    return new DefaultElements();
  }

  openUserDialog(): void {
    this.dialog.open(AddUserComponent);
  }

  openLabelDialog(): void {
    this.dialog.open(AddLabelComponent);
  }
}
