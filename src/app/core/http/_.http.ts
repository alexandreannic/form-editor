import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/internal/operators/catchError';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoggerSv} from '../service/logger.sv';
import {ProgressService} from '../service/progress';
import {tap} from 'rxjs/internal/operators';

declare let pc_form: any;

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'particeep-setup'
  })
};

@Injectable()
export class HttpService {

  constructor(protected http: HttpClient,
              private logger: LoggerSv,
              private formStateSvc: ProgressService,) {
    if (!pc_form) throw 'Parameter "pc_form" is not defined.';
  }

  get(url: string, params?: any): Observable<any> {
    const options = {};
    this.formStateSvc.start();
    if (params) options['params'] = new HttpParams({fromObject: params});
    return this.http.get(this.buildUrl(url), options).pipe(
      tap(_ => this.formStateSvc.saved()),
      catchError(this.handleError())
    );
  }

  post(url: string, body?: any): Observable<any> {
    this.formStateSvc.start();
    return this.http.post(this.buildUrl(url), body || {}, options).pipe(
      tap(_ => this.formStateSvc.saved()),
      catchError(this.handleError())
    );
  }

  put(url: string, body?: any): Observable<any> {
    this.formStateSvc.start();
    return this.http.put(this.buildUrl(url), body || {}, options).pipe(
      tap(_ => this.formStateSvc.saved()),
      catchError(this.handleError())
    );
  }

  delete(url: string): Observable<any> {
    this.formStateSvc.start();
    return this.http.delete(this.buildUrl(url)).pipe(
      tap(_ => this.formStateSvc.saved()),
      catchError(this.handleError())
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.formStateSvc.error('Something went wrong.');
      console.error(error);
      this.logger.notifyError(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  };

  private buildUrl(url: string): string {
    let base = pc_form.baseUrl || '';
    return `${base}/${url}`;
  }
}
