import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkplaceModel} from '../../models/workplace.model';
import {ADD_WORKPLACE, GET_ALL_WORKPLACES} from '../url_const';
import {AbstractApiService} from '../abstract-api.service';
import {AddWorkplace} from '../../store/workplace';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {PhotoService} from '../photo-api/photo.service';
import {catchError} from 'rxjs/operators';
import {UtilsMessage} from '../../shared/utils/utils-message';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceServiceApi extends AbstractApiService {
  constructor(private http: HttpClient, private photoService: PhotoService) {
    super();
  }

  getAllWorkplaces(userId: string): Observable<WorkplaceModel[]> {
    return this.http.get<WorkplaceModel[]>(this.createUrl(GET_ALL_WORKPLACES), {
      params: new HttpParams().append('userId', userId.toString())
    });
  }

  addWorkplace(data: WorkplaceModel, file: File): void {
    this.http.post(this.createUrl(ADD_WORKPLACE), data)
      .subscribe((element: WorkplaceModel) => {
        if (file) {
          this.photoService.addWorkplacePhoto(file, element.id)
            .pipe(
              catchError(_ => {
                UtilsMessage.showMessage(UtilsMessage.MESSAGE_UNEXPECTED_ERROR, UtilsMessage.MESSAGE_STATUS_ERROR);
                return null;
              })
            )
            .subscribe(_ => {
              this.storeWorkplace(element);
              UtilsMessage.showMessage(UtilsMessage.MESSAGE_WORKPLACE_CREATED, UtilsMessage.MESSAGE_STATUS_POSITIVE);
            });
          return;
        }
        this.storeWorkplace(element);
        UtilsMessage.showMessage(UtilsMessage.MESSAGE_WORKPLACE_CREATED, UtilsMessage.MESSAGE_STATUS_POSITIVE);
      });
  }

  @Dispatch()
  storeWorkplace(workplace: WorkplaceModel): AddWorkplace {
    return new AddWorkplace(workplace);
  }
}
