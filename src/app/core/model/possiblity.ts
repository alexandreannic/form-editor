export class Possibility {
  id: string;
  question_id: string;
  label: string;
  weight: number;
  index: number;

  constructor({question_id, label, weight}: any) {
    this.question_id = question_id;
    this.label = label || '';
    this.weight = weight;
  }
}
