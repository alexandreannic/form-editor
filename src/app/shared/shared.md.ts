import {NgModule} from '@angular/core';
import {MessagePipe} from '../shared/pipes/msg.pipe';
import {KeysPipe} from '../shared/pipes/keys.pipe';
import {FormStateCp} from './form-state/form-state.cp';
import {AutofocusDirective} from '../shared/utils/autofocus.cp';
import {CommonModule} from '@angular/common';
import {MaterialMd} from './material.md';
import {DragulaModule} from 'ng2-dragula';

@NgModule({
  declarations: [
    MessagePipe,
    KeysPipe,
    FormStateCp,
    AutofocusDirective,
  ],
  imports: [
    CommonModule,
    MaterialMd,
  ],
  exports: [
    MaterialMd,
    CommonModule,
    MessagePipe,
    KeysPipe,
    FormStateCp,
    AutofocusDirective,
    DragulaModule,
  ],
})
export class SharedMd {
}
