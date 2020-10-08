import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateWorkplaceDialogComponent} from './create-workplace-dialog/create-workplace-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  workPlaces: {name: string, description: string}[] = [];
  dialogRef: MatDialogRef<CreateWorkplaceDialogComponent>;

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.createDummyData();
  }

  private createDummyData(): void {
    for (let i = 0; i < 8; i++) {
      this.workPlaces.push({name: 'Work place name', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis. Sed porttitor rhoncus enim eget lacinia. Ut ac'});
    }
  }

  addWorkPlace(): void {
    this.dialogRef = this.dialog.open(CreateWorkplaceDialogComponent);
    this.dialogRef.afterClosed()
      .subscribe((workplace) => {
        this.workPlaces.push(workplace);
      });
  }


  getWorkPlace(): void {
    this.router.navigate(['main/workplace']);
  }
}
