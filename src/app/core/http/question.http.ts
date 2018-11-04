import {Injectable} from '@angular/core';
import {HttpService} from './_.http';
import {Observable} from 'rxjs';
import {Question} from '../model/question';

@Injectable()
export class QuestionHttp {

  constructor(protected http: HttpService) {
  }

  add(question: Question): Observable<Question> {
    return this.http.put(`question`, question);
  }

  update(question: Question): Observable<Question> {
    return this.http.post(`question/${question.id}`, question);
  }

  move(id: string, index: number): Observable<Question> {
    return this.http.post(`question/${id}`, {id, index});
  }

  remove(questionId: string): Observable<any> {
    return this.http.delete(`question/${questionId}`);
  }
}
