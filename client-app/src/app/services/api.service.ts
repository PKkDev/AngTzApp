import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  }),
  params: new HttpParams()
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly url = environment.urlApi;

  constructor(private httpClient: HttpClient) {
  }

  get<T>(path: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    if (params) {
      httpOptions.params = params;
    }
    return this.httpClient.get<T>(this.url + path, httpOptions);
  }

  post<T>(path: string, body?: object, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    if (params) {
      httpOptions.params = params;
    }
    if (headers) {
      httpOptions.headers = headers;
      if (headers.get('Content-Type') === 'multipart/form-data') {
        return this.httpClient.post<T>(this.url + path, body, httpOptions);
      }
    }
    return this.httpClient.post<T>(this.url + path, JSON.stringify(body), httpOptions);
  }

}
