import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Section} from '../core/model/section';
import {Form} from '../core/model/form';
import {ActiveService} from '../core/service/active.sv';
import {Question} from '../core/model/question';
import {Observable} from 'rxjs';

@Component({
  selector: 'pc-form-editor',
  encapsulation: ViewEncapsulation.None,
  providers: [MatSnackBar],
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form.scss']
})
export class FormCp {

  @Input() form: Form;

  @ViewChild('actions') $actions: ElementRef;

  acSection$: Observable<number>;

  constructor(private formSv: ActiveService) {
    this.acSection$ = this.formSv.acSection.asObservable();
  }

  stickActions() {
    this.$actions.nativeElement.style.top = window.scrollY + 'px';
  }

  addQuestion() {
    if (!this.form.sections || !this.form.sections[0]) {
      this.addSection();
      this.formSv.setAcSection(0);
    }

    const iSection = this.formSv.acSection.getValue() || 0;
    const section: Section = this.form.sections[iSection];
    const iQuestion = (this.formSv.acQuestion.getValue() != undefined
      ? this.formSv.acQuestion.getValue() + 1
      : section.questions.length);
    section.questions.splice(iQuestion, 0, new Question({section_id: section.id}));
    this.formSv.setAcQuestion(iQuestion);
  }

  addSection() {
    const index = this.formSv.acSection.getValue();
    this.form.sections.splice(index + 1, 0, new Section({form_id: this.form.id}));
    this.formSv.setAcSection(index)
  }
}
