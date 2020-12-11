import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkplaceElementModel} from '../../models/workplacemodels/workplaceelement.model';
import {SERVER_URL} from '../const';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceElementApiService {
  private GET_ELEMENTS = 'getElements';
  private GET_USER_PHOTO = 'getUserPhoto';

  constructor(private http: HttpClient) {}

  getWorkPlaceElements(workplaceId: number): Observable<WorkplaceElementModel[]> {
    return this.http.get<WorkplaceElementModel[]>(SERVER_URL + this.GET_ELEMENTS, {
      params: new HttpParams().append('workplaceId', workplaceId.toString())});
  }

  addWorkPlaceElement(data: WorkplaceElementModel): void {

  }

  getUserPhoto(userID: number): Observable<{ photo: string }> {
    return this.http.get<{ photo: string }>(SERVER_URL + this.GET_USER_PHOTO, {
      params: new HttpParams().append('userId', userID.toString())});
  }
}
