import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../components/model/login-dto';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false;

  public authorizEvent$: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private apiService: ApiService
  ) {
    const token = sessionStorage.getItem('auth');
    if (token)
      this.isAuth = true;
  }

  public logIn(login: string, pass: string): Observable<boolean> {
    const httpBody = new LoginDto(login, pass);
    return this.apiService.post<boolean>('auth', httpBody)
      .pipe(
        map(data => {
          if (data) {
            this.authorizEvent$.emit(true);
            this.isAuth = true;
            sessionStorage.setItem('auth', 'true');
          }
          return data;
        })
      );
  }

  public checkLogIn(): boolean {
    return this.isAuth;
  }

}
