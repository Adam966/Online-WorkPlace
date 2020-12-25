import { Injectable } from '@angular/core';
import {AbstractApiService} from '../abstract-api.service';
import {HttpClient} from '@angular/common/http';
import {GET_ALL_FILES} from '../url_const';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageApiService extends AbstractApiService{
  constructor(private http: HttpClient) {
    super();
  }

  getFiles(workplaceId: string): Observable<any> {
    this.urlPrefix = `workplace/${workplaceId}/`;
    return this.http.get<{ name: string, owner: string, type: string, size: number }>(this.createUrl(GET_ALL_FILES));
  }

  addFile(): void {
  }

  removeFile(): void {
  }

  downloadFile(): void {
  }
}
