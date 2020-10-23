import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NoteThreadDialogComponent} from './workplace-screen/create-dialog/note-thread-dialog/note-thread-dialog.component';
import {ChecklistDialogComponent} from './workplace-screen/create-dialog/checklist-dialog/checklist-dialog.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  changeToolbar = true;
  isLoading = false;
  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.router.navigate(['dashboard'], {relativeTo: this.route});
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
