import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {Possibility} from '../../core/model/possiblity';
import {FormHttp} from '../../core/http/form.http';
import {PossibilityHttp} from '../../core/http/possibility.http';
import {Question, QuestionType} from '../../core/model/question';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'pc-possibility',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './possibility.html',
  styleUrls: ['./possibility.scss'],
})
export class PossibilityCp implements OnInit, OnDestroy, OnChanges, DoCheck {

  readonly Type = QuestionType;

  @Input() possibility: Possibility;

  @Input() parent: Question;

  @Input() index: number;

  @Input() parentId: string;

  @Input() isActive: boolean;

  @Output() add: EventEmitter<void> = new EventEmitter();

  form: FormGroup;

  get weights(): string[] {
    return this.formHttp.getPossibilitiesWeights();
  };

  constructor(private possibilityHttp: PossibilityHttp,
              private formHttp: FormHttp,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef,) {
  }

  ngOnChanges(sc: SimpleChanges) {
    if (sc['index']) this.possibility.index = sc['index'].currentValue;
    if (sc['parentId']) this.possibility.question_id = sc['parentId'].currentValue;
    if (!this.possibility.id && this.possibility.question_id) {
      this.possibilityHttp.add(this.possibility).subscribe((p: Possibility) => {
        this.possibility.id = p.id;
      });
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.possibilityHttp.remove(this.possibility.id).subscribe();
  }

  ngDoCheck() {
    if (this.parent.id !== this.possibility.question_id)
      this.cdr.markForCheck();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      label: [this.possibility.label, Validators.required],
      weight: this.possibility.weight,
    });
    this.form.valueChanges.pipe(debounceTime(800)).subscribe(p => {
      this.possibility = Object.assign(this.possibility, p);
      this.possibilityHttp.update(this.possibility).subscribe();
    });
  }

  private remove() {
    this.parent.possibilities.splice(this.index, 1);
  }
}
