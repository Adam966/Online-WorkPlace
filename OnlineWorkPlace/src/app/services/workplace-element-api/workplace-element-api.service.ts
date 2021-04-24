import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkplaceElementModel} from '../../models/workplacemodels/workplaceelement.model';
import {AbstractApiService} from '../abstract-api.service';
import {ADD_ELEMENT, ARCHIVE_ELEMENT, GET_ARCHIVED_ELEMENTS, GET_ELEMENTS} from '../url_const';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceElementApiService extends AbstractApiService {
  constructor(private http: HttpClient) {
    super();
  }

  getWorkPlaceElements(workplaceId: string): Observable<WorkplaceElementModel[]> {
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.get<WorkplaceElementModel[]>(this.createUrl(GET_ELEMENTS));
  }

  addWorkPlaceElement(data: WorkplaceElementModel, workplaceId: string): Observable<WorkplaceElementModel> {
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.put<WorkplaceElementModel>(this.createUrl(ADD_ELEMENT), data);
  }

  archiveWorkplaceElement(elementId: number): Observable<any> {
    this.urlPrefix = '';
    return this.http.put(this.createUrl(ARCHIVE_ELEMENT, elementId.toString()), null);
  }

  getArchivedWorkplaceElements(workplaceId: string): Observable<WorkplaceElementModel[]> {
    return this.http.get<WorkplaceElementModel[]>(this.createUrl(GET_ARCHIVED_ELEMENTS, workplaceId));
  }
}
