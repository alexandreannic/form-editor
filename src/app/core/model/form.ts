import {Section} from './section';

export interface Form {
  id: string;
  sections: Section[];
  name: string;
  description: string;
}
