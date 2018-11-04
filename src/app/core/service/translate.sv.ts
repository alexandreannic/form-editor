import {Injectable} from '@angular/core';

declare let pc_form: any;

@Injectable()
export class TranslateSv {

  constructor() {
    this.messages = {...this.messages, ...pc_form.messages};
  }

  messages = {
    section: 'Section',
    question: 'Question',
    option: 'Option',
    addQuestion: 'Add question',
    addSection: 'Add section',
    addOption: 'Add option',
    save: 'Save',
    saved: 'Saved',
    duplicate: 'Duplicate',
    addCondition: 'Add a condition',
    delete: 'Delete',
    placeholder: {
      question: {
        label: 'Question',
        type: 'Type',
        required: 'Required',
      },
      section: {
        title: 'Section title (optional)',
        description: 'Section description (optional)'
      },
      option: {
        label: 'Option',
      },
    },
    preview: {
      TEXT: 'Short answer',
      LONGTEXT: 'Long answer',
      DOCUMENT: 'Document',
      DATE: 'Date',
    },
    questionType: {
      RADIO: 'Radio',
      SELECT: 'Select',
      TEXT: 'Text',
      LONGTEXT: 'Long text',
      CHECKBOX: 'Checkbox',
      DOCUMENT: 'Document',
      DATE: 'Date',
    },
    // Used inside default form displayed when none is set
    defaultForm: {
      sectionName: 'Section',
      questionName: 'Question',
      optionName: 'Option',
    }
  };
}
