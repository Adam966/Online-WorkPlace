import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/application-models/user.model';
import {
  ADD_WORKPLACE_LABEL,
  ADD_WORKPLACE_USER, CHANGE_USER_NOTIFICATIONS, CHANGE_USER_RIGHTS, DELETE_WORKPLACE_LABEL, DELETE_WORKPLACE_USER,
  FIND_USERS_BY_EMAIL, GET_ALL_USER_RIGHT,
  GET_WORKPLACE_LABELS, GET_WORKPLACE_RIGHTS,
  GET_WORKPLACE_USERS
} from '../url_const';
import {LabelModel} from '../../models/application-models/label.model';
import {AbstractApiService} from '../abstract-api.service';
import {RightsModel} from '../../models/rights-model/rights.model';
import {UserRightModel} from '../../models/rights-model/user-right.model';

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
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.post<null>(this.createUrl(ADD_WORKPLACE_USER + `/${userId}`), null);
  }

  addWorkplaceLabel(data: LabelModel, workplaceId: string): Observable<LabelModel> {
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.post<LabelModel>(this.createUrl(ADD_WORKPLACE_LABEL), data);
  }

  findUsersByEmail(email: string): Observable<UserModel[]> {
    this.urlPrefix = '';
    return this.http.get<UserModel[]>(this.createUrl(FIND_USERS_BY_EMAIL), {
      params: {
        email
      }
    });
  }

  deleteWorkplaceUser(workplaceId: number, userId: number): Observable<any> {
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.delete(this.createUrl(DELETE_WORKPLACE_USER, userId.toString()));
  }

  deleteWorkplaceLabel(workplaceId: number, labelId: number): Observable<any> {
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.delete(this.createUrl(DELETE_WORKPLACE_LABEL, labelId.toString()));
  }

  getUserRights(workplaceId: number, userId: number): Observable<RightsModel> {
    this.urlPrefix = `workplace/${workplaceId}/user/${userId}/`;
    return this.http.get<RightsModel>(this.createUrl(GET_WORKPLACE_RIGHTS));
  }

  changeUserNotifications(workplaceId: string, userId: string, notifications: any): Observable<any> {
    this.urlPrefix = `workplace/${workplaceId}/user/${userId}/`;
    return this.http.put(this.createUrl(CHANGE_USER_NOTIFICATIONS), notifications);
  }

  getAllUsersRights(workplaceId: string): Observable<UserRightModel[]> {
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.get<UserRightModel[]>(this.createUrl(GET_ALL_USER_RIGHT));
  }

  changeUserRights(workplaceId: string, rights: UserRightModel): Observable<any> {
    this.urlPrefix = `workplace/${workplaceId}/user/${rights.userId}/`;
    return this.http.put(this.createUrl(CHANGE_USER_RIGHTS), rights);
  }
}
