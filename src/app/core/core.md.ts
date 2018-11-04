import {ModuleWithProviders, NgModule} from '@angular/core';
import {PossibilityHttp} from './http/possibility.http';
import {TranslateSv} from './service/translate.sv';
import {LoggerSv} from './service/logger.sv';
import {FormHttp} from './http/form.http';
import {SectionHttp} from './http/section.http';
import {QuestionHttp} from './http/question.http';
import {ProgressService} from './service/progress';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpService} from './http/_.http';
import {HttpClientModule} from '@angular/common/http';
import {ActiveService} from './service/active.sv';

const NG_MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
];

const HTTP = [
  HttpService,
  FormHttp,
  SectionHttp,
  QuestionHttp,
  PossibilityHttp,
];

const SERVICES = [
  ...HTTP,
  ProgressService,
  TranslateSv,
  LoggerSv,
  ActiveService,
];

@NgModule({
  declarations: [],
  imports: [
    ...NG_MODULES,
  ],
  exports: [
    ...NG_MODULES
  ],
  providers: SERVICES,
})
export class CoreMd {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreMd,
      providers: SERVICES
    };
  }
}
