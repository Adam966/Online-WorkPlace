import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkplaceModel} from '../../models/workplace.model';
import {ADD_WORKPLACE, GET_ALL_WORKPLACES} from '../url_const';
import {AbstractApiService} from '../abstract-api.service';
import {AddWorkplace} from '../../store/workplace';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceServiceApi extends AbstractApiService {
  constructor(private http: HttpClient) {
    super();
  }

  getAllWorkplaces(userId: string): Observable<WorkplaceModel[]> {
    return this.http.get<WorkplaceModel[]>(this.createUrl(GET_ALL_WORKPLACES), {
      params: new HttpParams().append('userId', userId.toString())});
  }

  addWorkplace(data: WorkplaceModel): void {
    this.http.post(this.createUrl(ADD_WORKPLACE), data)
      .subscribe((element: WorkplaceModel) => {
        this.storeWorkplace(element);
        console.log(element);
      });
  }

  @Dispatch()
  storeWorkplace(workplace: WorkplaceModel): AddWorkplace {
    return new AddWorkplace(workplace);
  }
}
