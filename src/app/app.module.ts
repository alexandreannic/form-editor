import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormMd} from './form/form.md';
import {JsonpModule} from '@angular/http';
import {CoreMd} from './core/core.md';
import {SharedMd} from './shared/shared.md';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    FormMd,
    CoreMd.forRoot(),
    SharedMd,
    JsonpModule,
  ],
})
export class AppModule {
}
