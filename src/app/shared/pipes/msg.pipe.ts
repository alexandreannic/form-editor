import {Pipe, PipeTransform} from '@angular/core';
import {TranslateSv} from '../../core/service/translate.sv';

@Pipe({
  name: 'm',
})
export class MessagePipe implements PipeTransform {

  constructor(private translate: TranslateSv) {
  }

  transform(value?: any): object {
    // We could use value as path as follows
    // > {{'some.key.message' | m}}
    // but for performance reason, it is more reasonable to simply return the messages instead of deep searching in the object
    // so use it as
    // > {{(''|m).some.key.message}}
    return this.translate.messages;
  }
}
