import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {WorkplaceElementModel} from '../../models/workplacemodels/workplaceelement.model';
import {WorkplaceElementApiService} from '../../services/workplace-element-api/workplace-element-api.service';
import {Store} from '@ngxs/store';
import {GetWorkplacesElements} from '../../store/workplace-element';

@Injectable({ providedIn: 'root' })
export class WorkplaceScreenResolver implements Resolve<WorkplaceElementModel[]> {
  constructor(private workplaceElementService: WorkplaceElementApiService, private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<WorkplaceElementModel[]> | Promise<WorkplaceElementModel[]> | WorkplaceElementModel[] {
    this.store.dispatch(new GetWorkplacesElements(1));
    return this.workplaceElementService.getWorkPlaceElements(1);
  }

}
