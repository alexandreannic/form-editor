import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'pc-question-validation-document',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pc-feature class="question_feature" [label]="('' | m).AllowOnlySpecificFileTypes" [isOpen]="showExtensions()">
      <mat-slide-toggle
        pc-feature-action
        [checked]="showExtensions()"
        (change)="toggleValidation($event)">
      </mat-slide-toggle>

      <div [formGroup]="extensionsForm">
        <span *ngFor="let t of extensions | keys" class="pc-question-document_ext"
              [title]="extensions[t].join(', ')">
            <mat-checkbox [formControlName]="t">{{t}}</mat-checkbox>
        </span>
      </div>
    </pc-feature>
  `
})
export class Question_ValidationDocumentCp implements OnInit {

  readonly extensions = {
    image: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'svg', 'tif',],
    spreadsheet: ['xls', 'xlt', 'xlm', 'csv', 'ods', 'numbers', 'xltm', 'xltx', 'xlsm', 'xlsx', 'xlam',],
    document: ['doc', 'docx', 'docm', 'dot', 'dotx', 'dotm', 'rtf', 'txt', 'odt', 'pages'],
    presentation: ['ppt', 'pptx', 'potx', 'potm', 'odp', 'key'],
    pdf: ['pdf'],
  };

  @Input() form: FormGroup;

  extensionsForm: FormGroup;

  private showValidation: boolean = false;

  ngOnInit() {
    const group = {};
    const pattern = this.form.get('pattern').value;
    Object.keys(this.extensions).map(t =>
      group[t] = new FormControl(pattern && new RegExp(`[^\\w]+${this.extensions[t][0]}[^\\w]+`).test(pattern))
    );
    this.extensionsForm = new FormGroup(group);
    this.extensionsForm.valueChanges.subscribe(v => this.form.patchValue({pattern: this.generatePattern(v)}));
  }

  toggleValidation(e: any) {
    if (!e.checked) this.form.patchValue({pattern: ''});
    this.showValidation = e.checked;
  }

  showExtensions(): boolean {
    return this.showValidation || this.form.get('pattern').value != '';
  }

  private generatePattern(v: { [key: string]: boolean }): string {
    const pattern = Object.keys(v).filter(ext => v[ext]).map(t => this.extensions[t].join('|')).join('|');
    return pattern ? `.*\\\.(${pattern})$` : '';
  }
}
