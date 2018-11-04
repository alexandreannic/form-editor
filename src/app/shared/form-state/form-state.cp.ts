import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormState, ProgressService, StateEvent} from '../../core/service/progress';

@Component({
  selector: 'pc-form-progress',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container [ngSwitch]="state">
      <mat-icon *ngSwitchCase="State.SAVED" class="color-success"
                [matTooltip]="(''|m).saved" matTooltipPosition="before">
        check
      </mat-icon>
      <mat-progress-spinner *ngSwitchCase="State.IN_PROGRESS"
                            mode="indeterminate" diameter="28" strokeWidth="2"></mat-progress-spinner>
      <mat-icon *ngSwitchCase="State.ERROR" class="color-error" [matTooltip]="msg" matTooltipPosition="before">
        error
      </mat-icon>
    </ng-container>
  `
})
export class FormStateCp implements OnInit {

  readonly State = FormState;

  state = FormState.SAVED;

  msg: string;

  constructor(public service: ProgressService,) {
    window.onbeforeunload = () => {
      if (this.service.isInProgress())
        return 'Are you sure you want to leave?';
    };
  }

  ngOnInit(): void {
    this.service.watch().subscribe((event: StateEvent) => {
      this.state = event.type;
      this.msg = event.msg;
    })
  }
}
