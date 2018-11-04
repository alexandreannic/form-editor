# Form-editor

### About

Form editor for Particeep API.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

### Getting started
Make sure you have Node version >= 5.0, NPM >= 3 and SBT installed

#### Install node modules
```bash
npm i
```
#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Usage

#### Parameters

| Variable             | Type           |Required| Description |
|----------------------|----------------|--------|-------------|
|`baseUrl`             |string          |true    |Url to the application where perform requests|
|`formId`              |string          |true    |Form Id|
|`weights`             |string[]        |        |You can give weight to a question possibility. If unset, no weight will be assignable and the dedicated input will be hidden. If set, take care of setting the associated label in messages as the exemple bellow.|
|`messages`            |Object          |        |A list of messages to handle i18n. Default messages are wrote in english;|
|`errorCallback`       |function        |        |Function called whenever an error occurs|

#### Example

```html
<script>
var pc_form = {
  baseUrl: 'http://local.particeep.com:9000/app/52c5a6c5-accd-4b94-9e6a-fd2c8cc819e1',
  formId: '3ff1c761-c213-4c4e-b0b2-c66d2edc4961',
  weights: [1, 2, 3],
  messages: {
    addQuestion: 'Ajouter une question',
    addSection: 'Ajouter une section',
    addOption: 'Add option',
    addValidation: 'Validation de la réponse',
    save: 'Save',
    duplicate: 'Duplicate',
    delete: 'Delete',
    minimize: 'Minimize',
    documentValidation: {
      AllowOnlySpecificFileTypes: 'Allow only specific file types',
      filter: {
        image: 'image',
        spreadsheet: 'spreadsheet',
        document: 'document',
        presentation: 'presentation',
        pdf: 'pdf',
      }
    },
    condition: {
      closePopup: 'Close',
      relatedQuestion: 'In question',
      relatedSection: 'In section',
      popupTitle: 'Display condition',
      popupDesc: 'Pick an answer which must be selected to display this question',
      noQuestion: 'No question with possibilities',
    },
    placeholder: {
      question: {
        label: 'Question',
        description: 'Description',
        type: 'Type',
        required: 'Required',
      },
      section: {
        title: 'Titre de la section',
        description: 'Section description (optional)'
      },
      option: {
        label: 'Option',
      },
      validation: {
        MAX_LENGTH: 'Nombre de caractères maximum',
        MIN_LENGTH: 'Nombre de caractères minimum',
        EMAIL: 'email',
        PHONE: 'phone',
        REGEX: 'pattern',
      }
    },
    questionType: {
      RADIO: 'Radio',
      SELECT: 'Liste',
      TEXT: 'Text',
      LONGTEXT: 'Longtext',
      CHECKBOX: 'Checkbox',
      DATE: 'Date',
      DOCUMENT: 'DOCUMENT',
      LABEL: 'LABEL',
    },
    weight: {
      1: 1,
      2: 2,
      3: 3,
    }
  },
  errorCallback: function (msg) {
    console.error(msg);
  },
};
</script>

<pc-form></pc-form>
```
