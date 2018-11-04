import {Question} from './question';

export class Section {
  id: string;
  form_id: string;
  name: string;
  description: string;
  index: number;
  questions: Question[];

  constructor({form_id, name, description, questions}: any) {
    this.form_id = form_id || undefined;
    this.name = name || '';
    this.description = description || '';
    this.questions = questions || [];
  }
}
