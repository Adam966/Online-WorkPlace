import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateWorkplaceDialogComponent} from './create-workplace-dialog/create-workplace-dialog.component';
import {Router} from '@angular/router';
import {WorkplaceServiceApi} from '../../../services/workplace-api/workplace-service-api.service';
import {WorkplaceState} from '../../../store/workplace';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {WorkplaceModel} from '../../../models/workplace.model';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {
  SetApplicationToolbarState,
  SetApplicationToolbarTitle,
  SetApplicationWorkplace
} from '../../../store/application';
import {LoginState} from '../../../store/login';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  @Select(WorkplaceState)
  workPlaces$: Observable<WorkplaceModel[]>;

  @Select(LoginState.userId)
  userId$: Observable<number>;

  private dialogRef: MatDialogRef<CreateWorkplaceDialogComponent>;
  private userId: number;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private workplaceService: WorkplaceServiceApi) { }

  ngOnInit(): void {
    this.changeToolbar();
    // this.setApplicationTitle();
    this.setApplicationWorkplace();

    this.userId$.subscribe(data => {
      this.userId = data;
    });
  }

  addWorkPlace(): void {
    this.dialogRef = this.dialog.open(CreateWorkplaceDialogComponent);
    this.dialogRef.afterClosed()
      .subscribe(workplace => {
        if (workplace?.workplace) {
          const file = workplace.file;
          workplace = {
            ...workplace.workplace, adminId: this.userId.toString(),
          };
          this.workplaceService.addWorkplace(workplace, file);
        }
      });
  }

  getWorkPlace(workplace: WorkplaceModel): void {
    this.router.navigate(['main/workplace', workplace.id], {
      state: { workplacePhoto: workplace.id, colorOfElement: workplace.colorOfElement, workplaceBackground: workplace.backgroundColor }
    });
  }

  // @Dispatch()
  // setApplicationTitle(): SetApplicationToolbarTitle {
  //   return new SetApplicationToolbarTitle('Online workplace');
  // }

  @Dispatch()
  changeToolbar(): SetApplicationToolbarState {
    return new SetApplicationToolbarState(false);
  }

  @Dispatch()
  setApplicationWorkplace(): SetApplicationWorkplace {
    return new SetApplicationWorkplace('');
  }
}
