import {Injectable} from '@angular/core';
import {HttpService} from './_.http';
import {Observable} from 'rxjs';
import {Section} from '../model/section';


@Injectable()
export class SectionHttp {

  constructor(protected http: HttpService) {
  }

  add(section: Section): Observable<Section> {
    return this.http.put(`section`, section);
  }

  update(section: Section): Observable<Section> {
    return this.http.post(`section/${section.id}`, section);
  }

  remove(sectionId: string): Observable<any> {
    return this.http.delete(`section/${sectionId}`);
  }
}
