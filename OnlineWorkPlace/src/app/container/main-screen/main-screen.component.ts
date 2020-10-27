import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateWorkplaceDialogComponent} from './create-workplace-dialog/create-workplace-dialog.component';
import {Router} from '@angular/router';
import {WorkplaceService} from './workplace/service/workplace.service';
import {AddWorkplace, GetWorkplaces, WorkplaceState} from '../../store/workplace';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {WorkplaceModel} from '../../models/workplace.model';
import {ApplicationModel, SetApplicationState} from '../../store/application';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  @Select(WorkplaceState)
  workPlaces$: Observable<WorkplaceModel[]>;

  dialogRef: MatDialogRef<CreateWorkplaceDialogComponent>;

  constructor(public dialog: MatDialog, private router: Router, private workplaceService: WorkplaceService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetWorkplaces(1))
      .subscribe(() => {
        this.store.dispatch(new SetApplicationState(false));
      });
  }

  addWorkPlace(): void {
    this.dialogRef = this.dialog.open(CreateWorkplaceDialogComponent);
    this.dialogRef.afterClosed()
      .subscribe(workplace => {
        if (workplace) {
          this.store.dispatch(new AddWorkplace(workplace));
        }
      });
  }

  getWorkPlace(): void {
    this.router.navigate(['main/workplace']);
  }
}
