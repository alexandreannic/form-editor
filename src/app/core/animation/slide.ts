import {animate, style, transition, trigger} from '@angular/animations';

export const animation = `160ms cubic-bezier(0.35, 0, 0.25, 1)`;

export const slideAnimation = trigger('slide', [
  transition(':enter', [
    style({'will-change': 'height', height: '0', overflow: 'hidden'}),
    animate(`${animation}`, style({height: '*'}))
  ]),
  transition(':leave', [
    style({'will-change': 'height', height: '*', overflow: 'hidden'}),
    animate(`${animation}`, style({height: 0}))
  ]),
]);
