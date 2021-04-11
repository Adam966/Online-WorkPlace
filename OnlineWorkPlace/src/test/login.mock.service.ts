import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

export class LoginMockService {
  login(): Observable<any> {
    const response = new HttpResponse({
      body: {
        id: 1,
        userName: 'Adam',
        userSurname: 'Ivan',
        email: 'adam.ivan@kosickaakademia.sk',
        token: '',
        photo: 1
      },
    });


    return of(response);
  }

  register(): Observable<any> {
    return of();
  }
}
