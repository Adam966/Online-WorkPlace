import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {SERVER_URL} from '../const';
import {LabelModel} from '../../models/label.model';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceSettingsApiService {
  private GET_WORKPLACE_USERS = 'getWorkplaceUsers';
  private GET_WORKPLACE_LABELS = 'getWorkplaceLabels';

  constructor(private http: HttpClient) { }

  getWorkplaceUsers(workplaceId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(SERVER_URL + this.GET_WORKPLACE_USERS, {
      params: new HttpParams().append('workplaceId', workplaceId.toString())});
  }

  getWorkplaceLabels(workplaceId: number): Observable<LabelModel[]> {
    return this.http.get<LabelModel[]>(SERVER_URL + this.GET_WORKPLACE_LABELS, {
      params: new HttpParams().append('workplaceId', workplaceId.toString())});
  }
}
