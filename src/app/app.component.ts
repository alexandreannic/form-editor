import {Component, ViewEncapsulation} from '@angular/core';
import {FormHttp} from './core/http/form.http';
import {Form} from './core/model/form';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'pc-form',
  encapsulation: ViewEncapsulation.None,
  template: `
    <pc-form-editor *ngIf="form$ | async as form " [form]="form"></pc-form-editor>
  `,
  styleUrls: [
    '../assets/material2.scss',
    '../assets/utils.scss',
    '../assets/global.scss',
    '../assets/dragula.scss',
  ]
})
export class AppComponent {

  form$: Observable<Form>;

  constructor(private formHttp: FormHttp) {
    this.form$ = this.formHttp.get();
  }
}
