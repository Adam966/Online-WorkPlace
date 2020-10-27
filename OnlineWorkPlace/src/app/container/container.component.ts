import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NoteThreadDialogComponent} from './workplace-screen/create-dialog/note-thread-dialog/note-thread-dialog.component';
import {ChecklistDialogComponent} from './workplace-screen/create-dialog/checklist-dialog/checklist-dialog.component';
import {Select, Store} from '@ngxs/store';
import {ApplicationModel, ApplicationState} from '../store/application';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Select(ApplicationState)
  applicationState: Observable<boolean>;

  isLoading: boolean;
  changeToolbar: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.router.navigate(['dashboard'], {relativeTo: this.route});
    this.applicationState.subscribe(state => {
      console.log('State ' + state);
    });
  }

  createDialog(type: string): void {
    this.dialog.open(NoteThreadDialogComponent, {
    data: {
      type
    }});
  }

  createTaskDialog(): void {
    this.dialog.open(ChecklistDialogComponent);
  }
}
