import {Injectable} from '@angular/core';
import {AbstractApiService} from '../abstract-api.service';
import {HttpClient} from '@angular/common/http';
import {ADD_WORKPLACE_PHOTO} from '../url_const';
import {Observable} from 'rxjs';
import {createForm} from '../../shared/utils/utils-photo-form';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends AbstractApiService {
  constructor(private http: HttpClient) {
    super();
  }

  addWorkplacePhoto(picture: File, workplaceId: number): Observable<any> {
    const formData: FormData = createForm(picture);
    return this.http.put(this.createUrl(ADD_WORKPLACE_PHOTO, workplaceId.toString()), formData);
  }
}
