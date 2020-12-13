import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {WorkplaceServiceApi} from '../../services/workplace-api/workplace-service-api.service';
import {WorkplaceModel} from '../../models/workplace.model';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SaveWorkplaces} from '../../store/workplace';
import { take, tap} from 'rxjs/operators';

@Injectable()
export class MainScreenResolver implements Resolve<WorkplaceModel[]> {
  constructor(private workplaceService: WorkplaceServiceApi) {}

  @Dispatch()
  saveWorkplaces(data: WorkplaceModel[]): SaveWorkplaces {
    return new SaveWorkplaces(data);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkplaceModel[]> | Promise<WorkplaceModel[]> | WorkplaceModel[] {
    console.log(route);
    return this.workplaceService.getAllWorkplaces(route.paramMap.get('userId'))
      .pipe(
        tap(data => {
          this.saveWorkplaces(data);
        }),
        take(1)
      );
  }
}
