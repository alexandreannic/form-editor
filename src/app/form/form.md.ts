import {NgModule} from '@angular/core';
import {FormCp} from './form.cp';
import {QuestionCp} from './question/question.cp';
import {SectionCp} from './section/section.cp';
import {PossibilityCp} from './possibility/possibility.cp';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedMd} from '../shared/shared.md';
import {Question_ValidationCp} from './question/validation/question_validation.cp';
import {Question_DependencyCp} from './question/dependency/question_dep.cp';
import {Question_DependencyDialog} from './question/dependency/question_dep.dialog';
import {FeatureActionsCp, FeatureCp} from './question/feature/feature.cp';
import {Question_TypeCp} from './question/type/question_type.cp';
import {Question_ValidationDocumentCp} from './question/validation/question_validation_document.cp';

@NgModule({
  declarations: [
    FormCp,
    SectionCp,
    QuestionCp,
    Question_DependencyCp,
    Question_DependencyDialog,
    Question_ValidationCp,
    Question_TypeCp,
    Question_ValidationDocumentCp,
    PossibilityCp,
    FeatureActionsCp,
    FeatureCp,
  ],
  imports: [
    SharedMd,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormCp
  ],
  entryComponents: [Question_DependencyDialog],
})
export class FormMd {
}
