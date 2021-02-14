import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {WorkplaceElementModel} from '../../models/workplacemodels/workplaceelement.model';
import {WorkplaceElementApiService} from '../../services/workplace-element-api/workplace-element-api.service';
import { tap} from 'rxjs/operators';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SaveWorkplacesElements} from '../../store/workplace-element';
import {GetWorkplaceLabels, GetWorkplaceUsers} from '../../store/workplace-settings';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceScreenResolver implements Resolve<WorkplaceElementModel[]> {
  constructor(private workplaceElementService: WorkplaceElementApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<WorkplaceElementModel[]> | Promise<WorkplaceElementModel[]> | WorkplaceElementModel[] {
    return this.workplaceElementService.getWorkPlaceElements(route.paramMap.get('workplaceId'))
      .pipe(
        tap(data => {
          this.saveWorkplaceElements(data);
          this.getWorkplaceLabels(Number(+route.paramMap.get('workplaceId')));
          this.getWorkplaceUsers(Number(+route.paramMap.get('workplaceId')));
        })
      );
  }

  @Dispatch()
  saveWorkplaceElements(data: WorkplaceElementModel[]): SaveWorkplacesElements {
    return new SaveWorkplacesElements(data);
  }

  @Dispatch()
  getWorkplaceLabels(workplaceId: number): GetWorkplaceLabels {
    return new GetWorkplaceLabels(workplaceId);
  }

  @Dispatch()
  getWorkplaceUsers(workplaceId: number): GetWorkplaceUsers {
    return new GetWorkplaceUsers(workplaceId);
  }
}
