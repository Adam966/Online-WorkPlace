import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WorkplaceElementModel} from '../../models/workplacemodels/workplaceelement.model';
import {Observable} from 'rxjs';
import {StorageApiService} from '../../services/storage-qpi/storage-api.service';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceScreenStorageResolver implements Resolve<{ }> {
  constructor(private workplaceStorageService: StorageApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<WorkplaceElementModel[]> | Promise<WorkplaceElementModel[]> | WorkplaceElementModel[] {
    return this.workplaceStorageService.getFiles(route.paramMap.get('workplaceId'));
  }
}
