import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkplaceModel} from '../../../../models/workplace.model';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceService {
  private url = 'https://729558d8-59b2-4855-a889-e219fbce401b.mock.pstmn.io/';
  constructor(private http: HttpClient) { }

  getAllWorkplaces(userId: number): Observable<WorkplaceModel[]> {
    return this.http.get<WorkplaceModel[]>(this.url + 'getWorkplace', {
      params: new HttpParams().append('userId', userId.toString())
    });
  }
}
