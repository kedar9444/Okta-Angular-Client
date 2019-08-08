import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private readonly apiEndPoint = environment.apiserver;

  constructor(private http: HttpClient, public oktaAuth: OktaAuthService) {}

  getHeadersAT(accessToken) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
      Authorization: 'Bearer ' + accessToken
    });
    // header.append("Content-Type", "application/json");
    // header.append("Access-Control-Allow-Headers", "*");
    // header.append("Authorization", "Bearer " + accessToken);
    return header;
  }

  getHeaders(): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Headers', '*');
    return headers;
  }

  get(path: string, AT?: any): Observable<any> {
    let h;
    if (AT) {
      h = this.getHeadersAT(AT);
    } else {
      h = this.getHeaders();
    }
    return this.http.get(`${this.apiEndPoint}${path}`, {
      headers: h
    });
  }

  post(path: string, body: object): Observable<any> {
    return this.http.post(`${this.apiEndPoint}${path}`, body, {
      headers: this.getHeaders()
    });
  }

  delete(path: string, body: object = {}): Observable<any> {
    return this.http.delete(`${this.apiEndPoint}${path}`, body);
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(`${this.apiEndPoint}${path}`, body);
  }
}
