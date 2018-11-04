import {ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation} from '@angular/core';
import {slideAnimation} from '../../../core/animation/slide';

@Directive({
  selector: '[pc-feature-action]',
  host: {'class': 'pc-feature-action'}
})
export class FeatureActionsCp {
}

@Component({
  selector: 'pc-feature',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="pc-feature_title">
      {{label}}
      <ng-content select="[pc-feature-action]"></ng-content>
    </div>
    <div class="pc-feature_body" *ngIf="isOpen" [@slide]>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./feature.scss'],
  animations: [slideAnimation],
})
export class FeatureCp {

  @Input() label: string;

  @Input() isOpen: boolean = false;
}
