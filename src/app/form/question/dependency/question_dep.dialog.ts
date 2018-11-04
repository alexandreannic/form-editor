import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {isDependable, Question} from '../../../core/model/question';
import {FormCp} from '../../form.cp';
import {FormControl, FormGroup} from '@angular/forms';
import {Section} from '../../../core/model/section';
import {map, startWith} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {of} from 'rxjs/index';
import {Possibility} from '../../../core/model/possiblity';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'pc-dependency-dialog',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./question_dependency.scss'],
  template: `
    <div mat-dialog-title style="margin-bottom:0">{{('' | m).condition.popupTitle}}</div>
    <div style="margin-bottom: 12px">{{('' | m).condition.popupDesc}}</div>
    <mat-dialog-content>
      <div class="pc-dep_node" *ngIf="(sections$ | async).length > maxNodeBeforeAutocomplete">
        <button mat-icon-button disabled>
          <mat-icon class="pc-dep_node-i -search">search</mat-icon>
        </button>
        <mat-form-field class="fullwidth form-field-compact" floatLabel="never">
          <input matInput placeholder="Favorite food" [formControl]="sectionControl">
        </mat-form-field>
      </div>
      <div *ngFor="let s of sections$ | async">
        <div class="pc-dep_node">
          <button mat-icon-button (click)="selectSection(s)">
            <mat-icon class="pc-dep_node-i" [class.-selected]="selectedSection?.id == s.id">
              keyboard_arrow_right
            </mat-icon>
          </button>
          <div [matTooltip]="s.name" class="pc-dep_node_txt">{{s.name}}</div>
        </div>

        <div *ngIf="selectedSection?.id === s.id" class="pc-dep_tree">
          <ng-container *ngIf="questions$ | async as questions">
            <div class="pc-dep_node" *ngIf="questions.length > maxNodeBeforeAutocomplete">
              <button mat-icon-button disabled>
                <mat-icon class="pc-dep_node-i -search">search</mat-icon>
              </button>
              <mat-form-field class="fullwidth form-field-compact" floatLabel="never">
                <input matInput placeholder="Favorite food"
                       [formControl]="questionControl">
              </mat-form-field>
            </div>
            <div *ngIf="questions.length === 0" class="pc-dep_node-empty">
              {{('' | m).condition.noQuestion}}
            </div>
            <div *ngFor="let q of questions">
              <div class="pc-dep_node">
                <button mat-icon-button (click)="selectQuestion(q)">
                  <mat-icon class="pc-dep_node-i" [class.-selected]="selectedQuestion?.id == q.id">
                    keyboard_arrow_right
                  </mat-icon>
                </button>
                <div [matTooltip]="q.label" class="pc-dep_node_txt">{{q.label}}</div>
              </div>

              <div class="pc-dep_tree" *ngIf="selectedQuestion?.id == q.id">
                <mat-radio-group style="display:block; margin-left: 10px">
                  <mat-radio-button
                    *ngFor="let p of selectedQuestion.possibilities"
                    [value]="p.id" class="pc-dep_radio"
                    [checked]="p.id == form.get('possibility_id_dep').value"
                    (click)="pick(selectedSection, selectedQuestion, p)">
                    <div>{{p.label}}</div>
                  </mat-radio-button>
                </mat-radio-group>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button color="primary" (click)="dialogRef.close()" style="margin-left: auto">
        {{('' | m).condition.closePopup}}
      </button>
    </mat-dialog-actions>
  `,
})
export class Question_DependencyDialog implements OnInit {

  readonly maxNodeBeforeAutocomplete = 10;

  @Input() question: Question;

  @Input() form: FormGroup;

  @Input() $form: FormCp;

  @Input() selectedSection: Section;

  @Input() selectedQuestion: Question;

  sectionControl: FormControl;

  questionControl: FormControl;

  sections$: Observable<Section[]> = of([]);

  questions$: Observable<Question[]> = of([]);

  constructor(public dialogRef: MatDialogRef<Question_DependencyDialog>) {}

  ngOnInit() {
    this.initSectionFilter();
    this.initQuestionFilter();
  }

  selectSection(s: Section) {
    if (this.selectedSection == s) this.selectedSection = null;
    else this.selectedSection = s;
  }

  selectQuestion(q: Question) {
    if (this.selectedQuestion == q) this.selectedQuestion = null;
    else this.selectedQuestion = q;
  }

  pick(section: Section, question: Question, possibility: Possibility) {
    this.dialogRef.close({section, question, possibility});
  }

  private initSectionFilter() {
    this.sectionControl = new FormControl();
    const filter = (v: string) => (s: Section) => !v || s.name.toLowerCase().indexOf(v.toLowerCase()) !== -1;
    this.sections$ = this.sectionControl.valueChanges.pipe(
      startWith(null),
      map(v => this.$form.form.sections.filter(filter(v)))
    );
  }

  private initQuestionFilter() {
    this.questionControl = new FormControl();
    const filter = (v: string) => (q: Question) => q.id !==
      this.question.id &&
      isDependable(q) &&
      (!v || q.label.toLowerCase().indexOf(v.toLowerCase()) !== -1)
    ;

    this.questions$ = this.questionControl.valueChanges.pipe(
      startWith(null),
      map(v => this.selectedSection ? this.selectedSection.questions.filter(filter(v)) : [])
    );
  }
}
