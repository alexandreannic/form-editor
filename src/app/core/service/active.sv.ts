import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ActiveService {

  acQuestion = new BehaviorSubject<number>(undefined);
  acSection = new BehaviorSubject<number>(0);

  setAcQuestion(i: number) {
    this.acQuestion.next(i);
  }

  setAcSection(i?: number) {
    if (i !== this.acSection.getValue())
      this.setAcQuestion(undefined);
    this.acSection.next(i);
  }

  clearActiveQuestion() {
    this.acQuestion.next(undefined);
  }
}
