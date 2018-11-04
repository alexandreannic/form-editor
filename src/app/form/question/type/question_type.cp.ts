import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'pc-question-type',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./question_type.scss'],
  template: `
    <mat-icon class="pc-question-type_i">{{icon}}</mat-icon>
    <div class="pc-question-type_body">
      <mat-form-field class="fullwidth form-field-compact">
        <input matInput disabled [placeholder]="text">
      </mat-form-field>
    </div>
  `,
  host: {'class': 'question_answer'}
})
export class Question_TypeCp {

  @Input() icon: string;

  @Input() text: boolean;
}
