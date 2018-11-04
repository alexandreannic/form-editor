import {Injectable} from '@angular/core';
import {HttpService} from './_.http';
import {Observable} from 'rxjs';
import {Possibility} from '../model/possiblity';

@Injectable()
export class PossibilityHttp {

  constructor(protected http: HttpService) {
  }

  add(possibility: Possibility): Observable<Possibility> {
    return this.http.put(`possibility`, possibility);
  }

  update(possibility: Possibility): Observable<Possibility> {
    return this.http.post(`possibility/${possibility.id}`, possibility);
  }

  remove(possibilityId: string): Observable<any> {
    return this.http.delete(`possibility/${possibilityId}`);
  }
}
