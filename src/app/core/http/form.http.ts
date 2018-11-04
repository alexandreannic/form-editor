import {Injectable} from '@angular/core';
import {TranslateSv} from '../service/translate.sv';
import {HttpService} from './_.http';
import {Form} from '../model/form';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

declare let pc_form: any;

@Injectable()
export class FormHttp {

  constructor(private translateSv: TranslateSv, protected http: HttpService) {
    if (!pc_form.formId) throw 'Missing pc_form.formId !';
    // Following line does not work, so we if no pc_form is defined, module will crash
    // pc_form = pc_form || {};
  }

  get(): Observable<Form> {
    return this.http.get(`form/${pc_form.formId}`).pipe(map(f => {
      if (f.sections.length == 0) return this.buildDefaultForm(f.id);
      return f;
    }));
  }

  getPossibilitiesWeights(): string[] {
    return pc_form.weights;
  }

  private buildDefaultForm(id: string): Form {
    return <Form> {
      'id': id,
      'name': '',
      'description': '',
      'sections': [
        {
          'name': this.translateSv.messages.defaultForm.sectionName,
          'index': 0,
          'questions': [
            {
              'label': this.translateSv.messages.defaultForm.questionName,
              'question_type': 'RADIO',
              'required': true,
              'index': 0,
              'possibilities': [
                {
                  'question_id': 'string',
                  'label': this.translateSv.messages.defaultForm.optionName,
                  'index': 0,
                  'weight': 0
                }
              ]
            }
          ]
        }
      ]
    };
  }
}
