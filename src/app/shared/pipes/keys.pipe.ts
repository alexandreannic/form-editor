import {Pipe, PipeTransform} from '@angular/core';

/**
 * Allow to use ngFor on an object.
 * http://stackoverflow.com/questions/35534959/access-key-and-value-of-object-using-ngfor
 *
 * Usage :
 *  <ul>
 *      <li *ngFor='let key of demo | keys'>
 *          Key: {{key}}, value: {{demo[key]}}
 *      </li>
 *  </ul>
 */
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}
