import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ValidationType} from '../../../core/model/question';
import {FormBuilder, FormGroup} from '@angular/forms';
import {slideAnimation} from '../../../core/animation/slide';

@Component({
  selector: 'pc-question-validation',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./question_validation.scss'],
  template: `
    <pc-feature [label]="('' | m).addValidation" [isOpen]="validationForm.get('type').value">
      <mat-slide-toggle
        pc-feature-action
        [checked]="validationForm.get('type').value"
        (change)="toggleValidation($event)">
      </mat-slide-toggle>

      <div [formGroup]="validationForm" style="display:flex; align-items: center"
           [class.hidden]="!validationForm.get('type').value">
        <mat-form-field class="form-field-compact" style="flex:1">
          <mat-select formControlName="type">
            <mat-option *ngFor="let t of types || (TYPES | keys)" [value]="t">
              {{('' | m).placeholder.validation[t]}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="form-field-compact" [class.hidden]="!hasValue()"
                        style="margin-left: 8px; width: 70px" floatLabel="never">
          <input matInput formControlName="value" type="number" min="1"
                 [placeholder]="(''|m).placeholder.validation.number">
        </mat-form-field>
        <button mat-icon-button (click)="clear()">
          <mat-icon>clear</mat-icon>
        </button>
      </div>
    </pc-feature>
  `,
  host: {'class': 'question_feature'},
  animations: [slideAnimation],
})
export class Question_ValidationCp implements OnInit {

  @HostBinding('@slide') get slide() {return true}

  readonly TYPES = ValidationType;

  readonly REGEX_EMAIL = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';

  readonly REGEX_PHONE = '^[+|0-9][0-9]{0,3}[0-9]{8,20}$';

  @Input() types: string[];

  @Input() form: FormGroup;

  validationForm: FormGroup;

  constructor(private fb: FormBuilder,) {}

  ngOnInit() {
    this.validationForm = this.fb.group({type: '', value: ''});
    this.initValidationForm(this.form.get('pattern').value);
    this.validationForm.valueChanges.subscribe(v => {
      if (!this.hasValue() || v.value) {
        this.form.patchValue({pattern: this.generateRegex(v.type, v.value)});
      }
    });
  }

  private initValidationForm(pattern: string): void {
    if (pattern === this.REGEX_EMAIL) {
      this.validationForm.patchValue({'type': ValidationType.EMAIL})
    }
    else if (pattern === this.REGEX_PHONE) {
      this.validationForm.patchValue({'type': ValidationType.PHONE})
    }
    else if (/{\d+,}/.test(pattern)) {
      this.validationForm.patchValue({'type': ValidationType.MIN_LENGTH, 'value': pattern.match(/(\d+)/)[1]})
    }
    else if (/{0,\d+}/.test(pattern)) {
      this.validationForm.patchValue({'type': ValidationType.MAX_LENGTH, 'value': pattern.match(/0,(\d+)/)[1]})
    }
    else {
      this.resetForm();
    }
  }

  toggleValidation(e: any) {
    e.checked ? this.add() : this.clear();
  }

  add(): void {
    this.validationForm.patchValue({type: ValidationType.MAX_LENGTH});
  }

  clear(): void {
    this.resetForm();
    this.form.patchValue({pattern: null});
  }

  hasValue(): boolean {
    return [
        ValidationType.MAX_LENGTH,
        ValidationType.MIN_LENGTH,
      ].indexOf(this.validationForm.get('type').value) != -1;
  }

  private generateRegex(type: string, value: string): string {
    switch (type) {
      case ValidationType.MIN_LENGTH:
        return `^[\s\S]${value},}$`;
      case ValidationType.MAX_LENGTH:
        return `^[\s\S]{0,${value}}$`;
      case ValidationType.EMAIL:
        return this.REGEX_EMAIL;
      case ValidationType.PHONE:
        return this.REGEX_PHONE;
      // case ValidationType.REGEX:
      //     return value;
    }
    return '';
  }

  private resetForm(): void {
    this.validationForm.patchValue({type: null, value: null});
  }
}
