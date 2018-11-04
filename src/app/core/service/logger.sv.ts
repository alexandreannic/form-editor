import {Injectable} from '@angular/core';

declare let pc_form: any;

@Injectable()
export class LoggerSv {
  notifyError(msg: string): void {
    pc_form.errorCallback(msg)
  }
}
