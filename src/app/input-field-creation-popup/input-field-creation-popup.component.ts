import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormJsonCreator } from '../services/formjsoncreator.service';
import { FormcontrolInterface } from '../interfaces/formcontrol.interface';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormcontrolNameGenerator } from '../services/formcontrolnamegenerator.service';
import { ValidatorInterface } from '../interfaces/validator.interface';
import { LayoutFormcontrolInterface } from '../interfaces/layoutformcontrol.interface';
import { OptionsInterface } from '../interfaces/options.interface';
import { CheckboxOptionsInterface } from '../interfaces/checkbox.interface';

@Component({
  selector: 'app-input-field-creation-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './input-field-creation-popup.component.html',
  styleUrl: './input-field-creation-popup.component.css',
})
export class InputCreationPopupComponent {
  private jsonStorage = inject(FormJsonCreator);
  private nameGenerator = inject(FormcontrolNameGenerator);
  public dialogRef = inject(MatDialogRef<InputCreationPopupComponent>);

  public labelCondition: string = '';
  public type: string = 'text';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      class: string;
      rowId?: number;
      columnId?: number;
      label: string;
    }
  ) {
    this.labelCondition = data.label;
    if (this.labelCondition === 'Single Line Text') {
      this.type = 'text';
    } else if (this.labelCondition === 'Multi Line Text') {
      this.type = 'textarea';
    } else if (this.labelCondition === 'Integer') {
      this.type = 'number';
    } else if (this.labelCondition === 'Date') {
      this.type = 'date';
    } else if (this.labelCondition === 'Time') {
      this.type = 'time';
    } else if (this.labelCondition === 'Date & Time') {
      this.type = 'datetime-local';
    } else if (this.labelCondition === 'Single Selection') {
      this.type = 'radio';
    } else if (this.labelCondition === 'Multi Selection') {
      this.type = 'checkbox';
    } else if (this.labelCondition === 'Dropdown') {
      this.type = 'select';
    } else if (this.labelCondition === 'Upload') {
      this.type = 'file';
    }
  }
  public label: string = '';
  public value: string = '';
  public placeholder: string = '';
  public class: string = this.data.class as string;
  requiredField: boolean = false;
  numberOfOptions: number | undefined;
  dropdownEntry: OptionsInterface[] = [];
  optionSelect: boolean = false;
  public ValidationAdd: string = 'No';
  public showNumOfVals: boolean = false;
  public numberOfValidation: number = 0;
  public validators: ValidatorInterface[] = [];
  public validatorSelector: boolean = false;
  public required: boolean = false;
  public toggle: boolean = false;
  public enableSubmit: boolean = false;
  allowedFileTypes: { key: string; value: boolean }[] = [
    { key: 'allowImages', value: false },
    { key: 'allowPdf', value: false },
    { key: 'allowDocs', value: false },
    { key: 'allowSpreadsheets', value: false },
  ];
  allowedTypesLabel: string[] = [
    'Images',
    'Pdf',
    'Doc files',
    'Csv/Excel sheets',
  ];
  onSubmit(): void {
    let allowedFiles: string[] = [];

    if (this.allowedFileTypes[0].value === true) {
      allowedFiles.push('.jpeg');
      allowedFiles.push('.png');
      allowedFiles.push('.jpg');
    }
    if (this.allowedFileTypes[1].value === true) {
      allowedFiles.push('.pdf');
    }
    if (this.allowedFileTypes[2].value === true) {
      allowedFiles.push('.doc');
      allowedFiles.push('.docx');
    }
    if (this.allowedFileTypes[0].value === true) {
      allowedFiles.push('.xlsx');
      allowedFiles.push('.xls');
      allowedFiles.push('.csv');
    }
    if (this.data.rowId === undefined) {
      this.withoutLayoutFormCreation(allowedFiles);
    }
  }
  addDropdownEntries(): void {
    if (this.numberOfOptions !== undefined) {
      this.dropdownEntry = [];
      for (let i = 0; i < this.numberOfOptions; i++) {
        this.dropdownEntry.push({ id: i, value: '' });
      }
      this.optionSelect = true;
    }
    this.enableSubmitButton();
  }
  checkToAddValidation(): void {
    if (this.ValidationAdd === 'Yes') {
      this.showNumOfVals = true;
    } else if (this.ValidationAdd === 'No') {
      this.showNumOfVals = false;
      this.numberOfValidation = 0;
      this.validators = [];
      this.validatorSelector = false;
    }
  }

  addEntries(): void {
    this.validators = [];
    for (let i = 0; i < this.numberOfValidation; i++) {
      this.validators.push({
        validationName: '',
        message: '',
        maxLength: 0,
        minLength: 0,
        pattern: '',
      });
    }
    this.validatorSelector = true;
  }

  enableSubmitButton(): void {
    if (this.label !== '') {
      this.enableSubmit = true;
    }
  }

  withoutLayoutFormCreation(allowedFiles: string[]): void {
    let field: FormcontrolInterface;
    if (this.validatorSelector === false) {
      field = {
        class: this.class,
        label: this.label,
        name: this.nameGenerator.transformString(this.label),
        value: this.value,
        placeholder: this.placeholder,
        type: this.type,
        options: this.dropdownEntry,
        acceptedFileTypes: allowedFiles,
        required: this.required,
        toggle: this.toggle,
      };
      this.jsonStorage.fieldCreator(field);
    } else if (this.validatorSelector === true) {
      let validations: ValidatorInterface[] = [];
      for (let i = 0; i < this.numberOfValidation; i++) {
        if (this.validators[i].validationName === 'required') {
          validations.push({
            validationName: this.validators[i].validationName,
            message: 'This is a required field',
          });
        } else if (this.validators[i].validationName === 'email') {
          validations.push({
            validationName: this.validators[i].validationName,
            message: 'Please enter a valid email',
          });
        } else if (this.validators[i].validationName === 'maxlength') {
          const messageString: string =
            (('Please enter less than ' +
              this.validators[i].maxLength) as string) + ' characters';
          validations.push({
            validationName: this.validators[i].validationName,
            message: messageString,
            maxLength: this.validators[i].maxLength,
          });
        } else if (this.validators[i].validationName === 'minlength') {
          const messageString: string =
            (('Please enter more than ' +
              this.validators[i].minLength) as string) + ' characters';
          validations.push({
            validationName: this.validators[i].validationName,
            message: messageString,
            minLength: this.validators[i].minLength,
          });
        }
      }

      field = {
        class: this.class,
        label: this.label,
        name: this.nameGenerator.transformString(this.label),
        value: this.value,
        placeholder: this.placeholder,
        type: this.type,
        validators: validations,
        options: this.dropdownEntry,
        acceptedFileTypes: allowedFiles,
        required: this.required,
        toggle: this.toggle,
      };
      this.jsonStorage.fieldCreator(field);
    }
    this.dialogRef.close(1);
  }
}
