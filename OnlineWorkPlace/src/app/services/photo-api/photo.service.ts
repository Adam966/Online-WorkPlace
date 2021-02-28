import {Injectable} from '@angular/core';
import {AbstractApiService} from '../abstract-api.service';
import {HttpClient} from '@angular/common/http';
import {ADD_WORKPLACE_PHOTO} from '../url_const';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends AbstractApiService {
  constructor(private http: HttpClient) {
    super();
  }

  addWorkplacePhoto(picture: File, workplaceId: number): Observable<any> {
    const formData: FormData = this.createForm(picture);
    return this.http.put(this.createUrl(ADD_WORKPLACE_PHOTO, workplaceId.toString()), formData);
  }

  addUserPhoto(picture: File, userId: number): Observable<any> {
    const formData = this.createForm(picture);
    return this.http.put(this.createUrl(ADD_WORKPLACE_PHOTO, userId.toString()), formData);
  }

  private createForm(picture: File): FormData {
    const formData: FormData = new FormData();
    formData.append('file', picture);
    return formData;
  }
}
