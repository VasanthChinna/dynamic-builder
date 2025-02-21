import { FormsService } from './../services/forms.service';
import { Component, inject, Input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DropzoneManagementService } from '../services/dropzonemanagement.service';
import { FormJsonCreator } from '../services/formjsoncreator.service';
import { SignalService } from '../services/signal.service';

@Component({
  selector: 'form-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.css',
})
export class FormListComponent implements OnInit {
  dropzoneManager = inject(DropzoneManagementService);
  signalManager = inject(SignalService);
  formJsonFormat = inject(FormJsonCreator);
  formsService = inject(FormsService);
  @Input() formsList: any[] = [];
  dataViewForm = 0;
  formEmitter = output<number>();
  readonly newForm = output<any>();

  constructor() {}
  ngOnInit(): void {
    const localData = localStorage.getItem('fromsList');
    if (localData !== null) {
      let formData = JSON.parse(localData);
      this.formsList = [...formData];
    }
  }
  dragOver(event: DragEvent): void {
    event.preventDefault();
  }

  updatedefaultForm() {
    console.log('default form build');
    // this.formsService.currentFormProfile(this.formsList);
  }

  openFormExisting(i: any) {
    this.formEmitter.emit(i);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    this.formsList.splice(
      event.currentIndex,
      0,
      this.formsList.splice(event.previousIndex, 1)[0]
    );
    if (event.previousContainer !== event.container) {
      this.formsList.splice(
        event.currentIndex,
        0,
        this.formsList.splice(event.previousIndex, 1)[0]
      );
    }
    localStorage.setItem('fromsList', JSON.stringify(this.formsList));
  }
  getForms(): void {}
  createForm(): void {
    console.log('emitted child to clear data of fields');
    this.signalManager.setMessage('emitted child to clear data of fields');
  }
}
