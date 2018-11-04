import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export enum FormState {
  IN_PROGRESS,
  SAVED,
  ERROR,
}

export class StateEvent {
  constructor(public type: FormState, public msg?: string) {}
}

@Injectable()
export class ProgressService {
  private event: BehaviorSubject<StateEvent> = new BehaviorSubject<StateEvent>(new StateEvent(FormState.SAVED));

  public start(): void {
    this.event.next(new StateEvent(FormState.IN_PROGRESS));
  }

  public saved(): void {
    this.event.next(new StateEvent(FormState.SAVED))
  }

  public error(msg?: string): void {
    this.event.next(new StateEvent(FormState.ERROR, msg));
  }

  watch(): Observable<StateEvent> {
    return this.event.asObservable();
  }

  isInProgress(): boolean {
    return this.event.getValue().type == FormState.IN_PROGRESS;
  }
}
