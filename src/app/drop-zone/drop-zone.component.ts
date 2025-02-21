import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormcontrolInterface } from '../interfaces/formcontrol.interface';
import { FormJsonCreator } from '../services/formjsoncreator.service';
import { DropzoneManagementService } from '../services/dropzonemanagement.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { InputCreationPopupComponent } from '../input-field-creation-popup/input-field-creation-popup.component';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SignalService } from '../services/signal.service';
import { FormsService } from '../services/forms.service';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RemoveModalComponent } from '../remove-fields/remove-modal.component';
import { CheckboxCreationPopup } from '../checkbox-creation-popup/checkbox-creation-popup.component';
import { RadioButtonCreationPopup } from '../radio-button-creation-popup/radio-button-creation-popup.component';
import { Preview } from '../preview/preview.component';
export class value {
  label?: any = '';
  value?: any = '';
}
@Component({
  selector: 'drop-zone',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './drop-zone.component.html',
  styleUrl: './drop-zone.component.css',
})
export class DropZoneComponent implements OnInit {
  dialog = inject(MatDialog);
  formJsonFormat = inject(FormJsonCreator);
  dropzoneManager = inject(DropzoneManagementService);
  signalManager = inject(SignalService);
  formsService = inject(FormsService);

  dropItem: string[] = [];
  droppedItem: FormcontrolInterface[] = [];
  formsList: any[] = [];
  class: string = 'col-md-12';
  rowNumber: number = -1;
  formName = '';
  formDescription = '';
  date: any = Date;
  successToast: boolean = false;
  errorToast: boolean = false;
  viewIndex: number = 0;
  body: any = {
    name: '',
    description: '',
    attributes: this.droppedItem,
  };
  value: value = {
    label: '',
    value: '',
  };

  defaultForm: FormcontrolInterface[] = [
    {
      class: 'col-md-12',
      label: 'Name',
      name: 'name',
      value: '',
      placeholder: '',
      type: 'text',
      options: [],
      acceptedFileTypes: [],
      required: false,
      toggle: false,
    },
    {
      class: 'col-md-12',
      label: 'Phone Number',
      name: 'phone_number',
      value: '',
      placeholder: '',
      type: 'number',
      options: [],
      acceptedFileTypes: [],
      required: false,
      toggle: false,
    },
    {
      class: 'col-md-12',
      label: 'Comments',
      name: 'comments',
      value: '',
      placeholder: '',
      type: 'textarea',
      options: [],
      acceptedFileTypes: [],
      required: false,
      toggle: false,
    },
  ];
  constructor() {
    this.formsService.newFormClick.subscribe(() => {
      this.clearFields();
    });

    this.formsService.defaultFormList.subscribe((msg) => {
      this.formName = 'Default Form Group';
      this.formDescription = 'Default Form description';
      this.droppedItem = [...this.defaultForm];
    });

    this.formsService.existingFormList.subscribe((i: any) => {
      this.formsList = JSON.parse(localStorage.getItem('fromsList') || '');
      const data = this.formsList.at(i);
      this.viewIndex = this.formsList.at(i);
      this.formName = data.name;
      this.formDescription = data.description;
      console.log(data.attributes);
      this.droppedItem = [...data.attributes[0]];
    });
  }
  public ngOnInit(): void {
    this.droppedItem = this.formJsonFormat.getAllFields();
  }

  clearFields() {
    this.formName = '';
    this.formDescription = '';
    this.droppedItem = [];
    this.formJsonFormat.clearAllFields();
  }

  dragOver(event: DragEvent): void {
    event.preventDefault();
  }
  onDrop2(event: CdkDragDrop<string[]>) {
    this.droppedItem.splice(
      event.currentIndex,
      0,
      this.droppedItem.splice(event.previousIndex, 1)[0]
    );
    if (event.previousContainer !== event.container) {
      this.droppedItem.splice(
        event.currentIndex,
        0,
        this.droppedItem.splice(event.previousIndex, 1)[0]
      );
    }
  }
  removeField(i: number) {
    const dialogRef = this.dialog.open(RemoveModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.droppedItem.splice(i, 1);
      }
    });
  }
  addValue(values: any) {
    values.push(this.value);
    this.value = { label: '', value: '' };
  }
  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (this.dropzoneManager.getExternalDropzoneEnable() === true) {
      const data = event.dataTransfer?.getData('text/plain');
      const { label } = JSON.parse(data as string);
      this.dropItem.push(label);
      if (label === 'Multi Selection') {
        const dialogClosed = this.dialog.open(CheckboxCreationPopup, {
          width: '25%',
          data: { class: this.class, label: label },
        });
        dialogClosed
          .afterClosed()
          .pipe(take(1))
          .subscribe((result: number) => {
            if (result === 1) {
              this.rowNumber++;
              this.droppedItem = this.formJsonFormat.getAllFields();
              this.body.attributes.push(this.droppedItem);
            }
          });
      } else if (label === 'Single Selection') {
        const dialogClosed = this.dialog.open(RadioButtonCreationPopup, {
          width: '25%',
          data: { class: this.class, label: label },
        });
        dialogClosed
          .afterClosed()
          .pipe(take(1))
          .subscribe((result: number) => {
            if (result === 1) {
              this.rowNumber++;
              this.droppedItem = this.formJsonFormat.getAllFields();
              this.body.attributes.push(this.droppedItem);
            }
          });
      } else if (label !== 'Multi Selection' || 'Single Selection') {
        const dialogClosed = this.dialog.open(InputCreationPopupComponent, {
          width: '25%',
          data: { class: this.class, label: label },
        });
        dialogClosed
          .afterClosed()
          .pipe(take(1))
          .subscribe((result: number) => {
            if (result === 1) {
              this.rowNumber++;
              this.droppedItem = this.formJsonFormat.getAllFields();
              this.body.attributes.push(this.droppedItem);
            }
          });
      }
    }
  }

  updateForm(event: any) {
    let formStorage = localStorage.getItem('fromsList');
    let formNew = false;
    this.body.name = this.formName;
    this.body.description = this.formDescription;
    event.preventDefault();

    if (formStorage) {
      this.formsList = JSON.parse(localStorage.getItem('fromsList') || '');
      const formData = this.formsList.find((obj) => {
        if (obj.name === this.body.name) {
          formNew = true;
        }
      });
      if (!formNew) {
        this.formsList.push(this.body);
        localStorage.setItem('fromsList', JSON.stringify(this.formsList));
        this.signalManager.setMessage(this.formsList);
        this.successToast = true;
        const intervalRef = setInterval(() => {
          this.successToast = false;
          clearInterval(intervalRef);
        }, 2500);
      } else {
        this.errorToast = true;
        const intervalRef = setInterval(() => {
          this.errorToast = false;
          clearInterval(intervalRef);
        }, 2500);
      }
    } else {
      this.formsList.push(this.body);
      localStorage.setItem('fromsList', JSON.stringify(this.formsList));

      this.successToast = true;
      const intervalRef = setInterval(() => {
        this.successToast = false;
        clearInterval(intervalRef);
      }, 2500);
    }
  }
}
