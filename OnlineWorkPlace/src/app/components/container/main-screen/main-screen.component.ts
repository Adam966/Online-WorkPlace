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
import {SetApplicationToolbarState, SetApplicationToolbarTitle} from '../../../store/application';
import {UtilsMessage} from '../../../shared/utils/utils-message';


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

  ngOnInit(): void {
    this.changeToolbar();
    this.setApplicationTitle();
  }

  addWorkPlace(): void {
    this.dialogRef = this.dialog.open(CreateWorkplaceDialogComponent);
    this.dialogRef.afterClosed()
      .subscribe(workplace => {
        console.log(workplace);
        if (workplace) {
          this.store.dispatch(new AddWorkplace(workplace));
          this.workplaceService.addWorkplace(workplace);
          UtilsMessage.showMessage(UtilsMessage.MESSAGE_WORKPLACE_CREATED, UtilsMessage.MESSAGE_STATUS_POSITIVE);
        }
      });
  }

  getWorkPlace(workplace: WorkplaceModel): void {
    this.router.navigate(['main/workplace', workplace.id], {
      state: { workplacePhoto: workplace.photo, colorOfElement: workplace.colorOfElement }
    });
  }

  @Dispatch()
  setApplicationTitle(): SetApplicationToolbarTitle {
    return new SetApplicationToolbarTitle('Online workplace');
  }

  @Dispatch()
  changeToolbar(): SetApplicationToolbarState {
    return new SetApplicationToolbarState(false);
  }
}
