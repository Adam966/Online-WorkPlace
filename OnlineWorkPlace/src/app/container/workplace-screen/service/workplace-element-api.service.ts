import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkplaceElementModel} from '../../../models/workplacemodels/workplaceelement.model';
import {Store} from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceElementApiService {
  private url = 'https://729558d8-59b2-4855-a889-e219fbce401b.mock.pstmn.io/';

  constructor(private http: HttpClient) {}

  getWorkPlaceElements(workplaceId: number): Observable<WorkplaceElementModel[]> {
    return this.http.get<WorkplaceElementModel[]>(this.url + 'getElements', {
      params: new HttpParams().append('workplaceId', workplaceId.toString())});
  }

  addWorkPlaceElement(data: WorkplaceElementModel): void {

  }
}
