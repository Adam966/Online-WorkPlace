import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateWorkplaceDialogComponent} from './create-workplace-dialog/create-workplace-dialog.component';
import {Router} from '@angular/router';
import {WorkplaceServiceApi} from '../../../services/workplace-api/workplace-service-api.service';
import {AddWorkplace, WorkplaceState} from '../../../store/workplace';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {WorkplaceModel} from '../../../models/workplace.model';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import { SetApplicationToolbarState} from '../../../store/application';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  @Select(WorkplaceState)
  workPlaces$: Observable<WorkplaceModel[]>;

  private dialogRef: MatDialogRef<CreateWorkplaceDialogComponent>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private workplaceService: WorkplaceServiceApi,
    private store: Store) { }

  @Dispatch()
  changeToolbar(): SetApplicationToolbarState {
    return new SetApplicationToolbarState(false);
  }

  ngOnInit(): void {
    this.changeToolbar();
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

  getWorkPlace(workplaceId: number): void {
    this.router.navigate(['main/workplace', workplaceId]);
  }
}
