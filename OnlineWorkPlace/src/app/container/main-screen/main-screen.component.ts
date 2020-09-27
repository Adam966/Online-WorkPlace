import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateWorkplaceDialogComponent} from './create-workplace-dialog/create-workplace-dialog.component';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addWorkPlace(): void {
    this.dialog.open(CreateWorkplaceDialogComponent);
  }
}
