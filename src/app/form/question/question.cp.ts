import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {Question, QuestionType, ValidationType} from '../../core/model/question';
import {QuestionHttp} from '../../core/http/question.http';
import {ActiveService} from '../../core/service/active.sv';
import {Section} from '../../core/model/section';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Possibility} from '../../core/model/possiblity';
import {debounceTime} from 'rxjs/internal/operators';
import {animate, style, transition, trigger} from '@angular/animations';
import {animation, slideAnimation} from '../../core/animation/slide';

@Component({
  selector: 'pc-question',
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'isActive ? "-opened" : "-closed"',
    '(click)': 'active()'
  },
  styleUrls: ['./question.scss'],
  templateUrl: './question.html',
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate(`${animation}`, style({transform: 'scale(1)'}))
      ]),
      transition(':leave', [
        style({opacity: '1'}),
        animate(`${animation}`, style({opacity: 0, height: 0}))
      ]),
    ]),
    slideAnimation,
  ],
})
export class QuestionCp implements OnInit, OnDestroy {

  @HostBinding('@appear') get animation() {return true}

  readonly VALIDATIONS = ValidationType;

  readonly Type = QuestionType;

  @Input() question: Question;

  @Input() parent: Section;

  @Input() parentId: string;

  @Input() index: number;

  @Input() isActive: boolean;

  @Output() onActive: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private activeSv: ActiveService,
              private questionHttp: QuestionHttp) {
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(sc: SimpleChanges) {
    if (sc['parentId']) this.question.section_id = sc['parentId'].currentValue;
    if (sc['index']) this.question.index = sc['index'].currentValue;
    if (!this.question.id && this.question.section_id) {
      this.questionHttp.add(this.question).subscribe((q: Question) => {
        this.question.id = q.id;
      });
    }
  }

  ngOnDestroy() {
    this.questionHttp.remove(this.question.id).subscribe();
    if (this.index == 0) this.activeSv.clearActiveQuestion()
    else this.activeSv.setAcQuestion(this.index);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      question_type: this.question.question_type,
      required: this.question.required,
      label: this.question.label,
      description: this.question.description,
      possibility_id_dep: this.question.possibility_id_dep,
      pattern: this.question.pattern
    });

    this.form.valueChanges.subscribe(q => {
      this.question = Object.assign(this.question, q);
      if (q.question_type != this.question.question_type) {
        this.form.patchValue({pattern: ''});
        this.question.pattern = '';
      }
    });
    // TODO distinctUntilChanged()
    this.form.valueChanges.pipe(debounceTime(900)).subscribe(() => this.save());
  }

  remove(): void {
    this.activeSv.clearActiveQuestion();
    this.parent.questions.splice(this.index, 1);
  }

  duplicate(): void {
    const question = Object.assign({}, this.question);
    const clearIds = (q: Question): Question => {
      q.id = null;
      q.label = 'duplicate';
      q.possibilities.forEach(p => {
        p.id = null;
        p.question_id = null;
      });
      return q;
    };
    this.parent.questions.splice(this.index + 1, 0, clearIds(question));
    this.activeSv.setAcQuestion(this.index + 1);
  }

  addPossibility(): void {
    if (!this.question.possibilities) this.question.possibilities = [];
    this.question.possibilities.push(new Possibility({question_id: this.question.id}));
  }

  private save(): void {
    this.questionHttp.update(this.question).subscribe();
  }

  active(): void {
    this.activeSv.setAcQuestion(this.index);
  }

  inactive(): void {
    this.activeSv.clearActiveQuestion();
  }
}
