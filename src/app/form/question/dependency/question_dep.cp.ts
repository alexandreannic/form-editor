import {ChangeDetectorRef, Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Question} from '../../../core/model/question';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Question_DependencyDialog} from './question_dep.dialog';
import {FormCp} from '../../form.cp';
import {Section} from '../../../core/model/section';
import {Possibility} from '../../../core/model/possiblity';
import {slideAnimation} from '../../../core/animation/slide';

@Component({
  selector: 'pc-dep',
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./question_dependency.scss'],
  template: `
    <pc-feature
      [label]="('' | m).condition.popupTitle"
      [isOpen]="pickedPossibility">
      <mat-slide-toggle
        pc-feature-action
        [checked]="isChecked"
        (change)="toggleDependency($event)">
      </mat-slide-toggle>

      <div *ngIf="pickedPossibility">
        <div (click)="seeMore = !seeMore" class="pc-dep_picked">
          <div class="pc-dep_picked_label">{{pickedPossibility.label}}</div>
          <button mat-icon-button class="pc-dep_picked_btn" (click)="open(); $event.stopPropagation()">
            <mat-icon>edit</mat-icon>
          </button>
        </div>
        <div *ngIf="seeMore" class="pc-dep_picked_desc" [@slide]>
          <div class="pc-dep_picked_row">
            <div class="pc-dep_picked_row_label">{{('' | m).condition.relatedQuestion}}</div>
            <div class="pc-dep_picked_row_val">{{pickedQuestion.label}}</div>
          </div>
          <div class="pc-dep_picked_row">
            <div class="pc-dep_picked_row_label">{{('' | m).condition.relatedSection}}</div>
            <div class="pc-dep_picked_row_val">{{pickedSection.name}}</div>
          </div>
        </div>
      </div>
    </pc-feature>
  `,
  host: {'class': 'question_feature'},
  animations: [slideAnimation],
})
export class Question_DependencyCp implements OnInit {

  @Input() question: Question;

  @Input() form: FormGroup;

  pickedSection: Section;

  pickedQuestion: Question;

  pickedPossibility: Possibility;

  seeMore = false;

  isChecked = false;

  constructor(public dialog: MatDialog,
              @Inject(FormCp) private $form: FormCp,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.question.possibility_id_dep) this.fillSelection();
    const val = this.form.get('possibility_id_dep').value;
    this.isChecked = val && val !== '';
  }

  toggleDependency(e: any) {
    e.checked ? this.open() : this.clear();
  }

  open() {
    this.isChecked = true;
    const ref = this.dialog.open(Question_DependencyDialog, {width: '600px'});
    ref.componentInstance.question = this.question;
    ref.componentInstance.form = this.form;
    ref.componentInstance.$form = this.$form;
    ref.componentInstance.selectedSection = this.pickedSection;
    ref.componentInstance.selectedQuestion = this.pickedQuestion;
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.pickedSection = result.section;
        this.pickedQuestion = result.question;
        this.pickedPossibility = result.possibility;
        this.form.patchValue({possibility_id_dep: this.pickedPossibility.id});
      } else {
        this.isChecked = false;
      }
      this.cd.markForCheck();
    })
  }

  clear() {
    this.form.patchValue({possibility_id_dep: ''});
    this.pickedSection = null;
    this.pickedQuestion = null;
    this.pickedPossibility = null;
  }

  private fillSelection() {
    this.$form.form.sections.every((s: Section) =>
      s.questions.every((q: Question) =>
        q.possibilities.every((p: Possibility) => {
          if (p.id === this.question.possibility_id_dep) {
            this.pickedPossibility = p;
            this.pickedQuestion = q;
            this.pickedSection = s;
            return false;
          }
          return true;
        })
      )
    );
    this.cd.markForCheck();
  }
}
