import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateWorkplaceDialogComponent} from './create-workplace-dialog/create-workplace-dialog.component';
import {Router} from '@angular/router';
import {WorkplaceService} from './workplace/service/workplace.service';
import {WorkplaceModel} from '../../models/workplace.model';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  workPlaces: WorkplaceModel[] = [];
  dialogRef: MatDialogRef<CreateWorkplaceDialogComponent>;

  constructor(public dialog: MatDialog, private router: Router, private workplaceService: WorkplaceService) { }

  ngOnInit(): void {
    this.workplaceService.getAllWorkplaces(1)
      .subscribe(response => {
        this.workPlaces = response;
      });
  }

  addWorkPlace(): void {
    this.dialogRef = this.dialog.open(CreateWorkplaceDialogComponent);
    this.dialogRef.afterClosed()
      .subscribe((workplace) => {
        if (workplace) {
          this.workPlaces.push(workplace);
        }
      });
  }

  getWorkPlace(): void {
    this.router.navigate(['main/workplace']);
  }
}
