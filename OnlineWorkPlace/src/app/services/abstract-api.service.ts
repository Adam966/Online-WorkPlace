import { Injectable } from '@angular/core';
import {SERVER_URL} from './url_const';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractApiService {
  protected urlPrefix = '';

  createUrl(path: string): string {
    console.log(`${SERVER_URL}${this.urlPrefix}${path}`);
    return `${SERVER_URL}${this.urlPrefix}${path}`;
  }
}
