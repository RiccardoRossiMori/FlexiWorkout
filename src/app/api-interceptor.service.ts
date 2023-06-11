import { Injectable, InjectionToken } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

export const API_HTTP_CLIENT = new InjectionToken<HttpClient>('API_HTTP_CLIENT');

@Injectable()
export class ApiInterceptor {
  constructor(private http: HttpClient) {}

  getHttpClient(): HttpClient {
    return this.http;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Implementa qui la logica dell'interceptor
    // Puoi modificare la richiesta o eseguire altre azioni
    // prima o dopo l'invio della richiesta

    return next.handle(request);
  }
}
