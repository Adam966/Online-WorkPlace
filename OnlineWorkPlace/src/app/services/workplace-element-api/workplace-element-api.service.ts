import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkplaceElementModel} from '../../models/workplacemodels/workplaceelement.model';
import {SERVER_URL} from '../url_const';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceElementApiService {
  private GET_ELEMENTS = 'getElements';
  private GET_USER_PHOTO = 'getUserPhoto';

  constructor(private http: HttpClient) {}

  getWorkPlaceElements(workplaceId: string): Observable<WorkplaceElementModel[]> {
    return this.http.get<WorkplaceElementModel[]>(SERVER_URL + this.GET_ELEMENTS, {
      params: new HttpParams().append('workplaceId', workplaceId.toString())});
  }

  addWorkPlaceElement(data: WorkplaceElementModel): void {

  }
}
