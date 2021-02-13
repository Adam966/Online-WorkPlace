import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/application-models/user.model';
import {ADD_WORKPLACE_LABEL, ADD_WORKPLACE_USER, GET_WORKPLACE_LABELS, GET_WORKPLACE_USERS} from '../url_const';
import {LabelModel} from '../../models/label.model';
import {AbstractApiService} from '../abstract-api.service';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceSettingsApiService extends AbstractApiService {
  constructor(private http: HttpClient) {
    super();
  }



  getWorkplaceUsers(workplaceId: number): Observable<UserModel[]> {
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.get<UserModel[]>(this.createUrl(GET_WORKPLACE_USERS));
  }

  getWorkplaceLabels(workplaceId: number): Observable<LabelModel[]> {
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.get<LabelModel[]>(this.createUrl(GET_WORKPLACE_LABELS));
  }

  addWorkplaceUser(userId: string, workplaceId: string): Observable<UserModel> {
    this.urlPrefix = `workplace/${workplaceId}`;
    return this.http.post<null>(this.createUrl(ADD_WORKPLACE_USER + `/${userId}`), null);
  }

  addWorkplaceLabel(data: LabelModel, workplaceId: string): Observable<LabelModel> {
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.post<LabelModel>(this.createUrl(ADD_WORKPLACE_LABEL), data);
  }
}
