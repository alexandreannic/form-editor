import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Section} from '../../core/model/section';
import {ActiveService} from '../../core/service/active.sv';
import {Form} from '../../core/model/form';
import {SectionHttp} from '../../core/http/section.http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DragulaService} from 'ng2-dragula';
import {QuestionHttp} from '../../core/http/question.http';
import {debounceTime} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {animate, style, transition, trigger} from '@angular/animations';
import {animation} from '../../core/animation/slide';

@Component({
  selector: 'pc-section',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'isActive ? "-active" : "-inactive"',
    '(click)': 'active()'
  },
  styleUrls: ['./section.scss'],
  templateUrl: './section.html',
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({height: '0'}),
        animate(`${animation}`, style({height: '*'}))
      ]),
      transition(':leave', [
        style({opacity: '1'}),
        animate(`${animation}`, style({opacity: 0, height: 0}))
      ]),
    ]),
  ]
})
export class SectionCp implements OnInit, OnDestroy {

  @HostBinding('@appear') get animation() {return true}

  @Input() section: Section;

  @Input() parent: Form;

  @Input() parentId: string;

  @Input() index: number;

  @Input() isActive: boolean;

  @ViewChild('questions') $questionsContainer: any;

  form: FormGroup;

  acQuestion$: Observable<number>;

  constructor(private dragula: DragulaService,
              private fb: FormBuilder,
              private formSv: ActiveService,
              private sectionHttp: SectionHttp,
              private questionHttp: QuestionHttp) {
    this.acQuestion$ = this.formSv.acQuestion.asObservable();
  }

  ngOnInit() {
    this.buildForm();
    this.initDragAndDrop();
  }

  ngOnChanges(sc: SimpleChanges) {
    if (sc['parentId']) this.section.form_id = sc['parentId'].currentValue;
    if (sc['index']) this.section.index = sc['index'].currentValue;
    if (!this.section.id && this.section.form_id) {
      this.sectionHttp.add(this.section).subscribe(section => {
        this.section.id = section.id;
      });
    }
  }

  ngOnDestroy() {
    this.sectionHttp.remove(this.section.id).subscribe();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: this.section.name,
      description: this.section.description,
    });
    this.form.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      this.sectionHttp.update(this.section).subscribe();
    });
    this.form.valueChanges.subscribe(s => {
      this.section = Object.assign(this.section, s);
    })
  }

  private initDragAndDrop(): void {
    this.dragula.setOptions('questions-bag' + this.section.id, {
      moves: (el, source, handle, sibling) => el.classList.contains('-closed')
    });
    this.dragula.drop.subscribe((args: any) => {
      const [_, questionSource, sectionTarget, sectionSource, questionTarget] = args;
      if (this.$questionsContainer.nativeElement === sectionTarget) {
        const id = questionSource.dataset.id;
        const section_id = sectionTarget.dataset.id;
        const index = questionTarget
          ? [].slice.call(questionTarget.parentElement.children).indexOf(questionTarget) - 1 // TODO -1 should not be needed
          : sectionTarget.childElementCount;
        this.move(id, index);
      }
    })
  }

  remove() {
    this.parent.sections.splice(this.index, 1);
    this.formSv.setAcSection(0);
  }

  private move(questionId: string, index: number) {
    this.questionHttp.move(questionId, index).subscribe();
  }

  active(): void {
    this.formSv.setAcSection(this.index);
  }
}
