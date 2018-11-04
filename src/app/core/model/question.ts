import {Possibility} from './possiblity';

export class Question {
  readonly DEFAULT_TYPE = QuestionType.TEXT;

  id: string;
  label: string;
  description: string;
  question_type: QuestionType;
  section_id: string;
  index: number;
  required: boolean;
  possibilities: Possibility[];
  possibility_id_dep: string;
  pattern: string;

  constructor({label, type, section_id, description, required, possibilities}: any) {
    this.label = label || '';
    this.description = description || '';
    this.question_type = type || this.DEFAULT_TYPE;
    this.section_id = section_id || null;
    this.required = required || false;
    this.possibilities = possibilities || [new Possibility({})];
  }
}

export enum QuestionType {
  DOCUMENT = 'DOCUMENT',
  RADIO = 'RADIO',
  SELECT = 'SELECT',
  TEXT = 'TEXT',
  LONGTEXT = 'LONGTEXT',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
  LABEL = 'LABEL',
}

export enum ValidationType {
  MAX_LENGTH = 'MAX_LENGTH',
  MIN_LENGTH = 'MIN_LENGTH',
// MAX_NUMBER= 'MAX_NUMBER',
// MIN_NUMBER= 'MIN_NUMBER',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
// REGEX= 'REGEX',
}

export const isDependable = (q: Question): boolean =>
  q.question_type == QuestionType.RADIO ||
  q.question_type == QuestionType.SELECT
;

export const hasPossibilities = (q: Question): boolean =>
  q.question_type == QuestionType.RADIO ||
  q.question_type == QuestionType.CHECKBOX ||
  q.question_type == QuestionType.SELECT
;
