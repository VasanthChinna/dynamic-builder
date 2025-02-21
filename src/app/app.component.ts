import { Component, inject } from '@angular/core';
import { DraggableItemComponent } from './draggable-item/draggable-item.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormJsonCreator } from './services/formjsoncreator.service';
import { FormcontrolInterface } from './interfaces/formcontrol.interface';
import { Preview } from './preview/preview.component';
import { FormListComponent } from './form-list/form-list.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { SignalService } from './services/signal.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DraggableItemComponent,
    DropZoneComponent,
    CommonModule,
    MatDialogModule,
    FormListComponent,
    DragDropModule,
  ],
  providers: [SignalService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'd-forms';
  dialog = inject(MatDialog);
  jsonCreated = inject(FormJsonCreator);
  jsonFormat: FormcontrolInterface[] = [];
  draggableTextItems: {
    label: string;
    placeholder: string;
    type: string;
    icon: string;
    description: string;
  }[] = [
    {
      label: 'Single Line Text',
      placeholder: 'Single text area',
      type: 'text',
      icon: 'images/Aa.svg',
      description: 'Enter customer &#39; s',
    },
    {
      label: 'Multi Line Text',
      placeholder: 'Multi text area',
      type: 'textarea',
      icon: 'images/line-multi.svg',
      description: 'Enter customer &#39; s',
    },
    {
      label: 'Integer',
      placeholder: 'Integer type area',
      type: 'number',
      icon: 'images/numbers.svg',
      description: 'Enter customer &#39; s',
    },
  ];
  draggableDateItems: {
    label: string;
    placeholder: string;
    type: string;
    icon: string;
  }[] = [
    {
      label: 'Date',
      placeholder: 'Select date from pricker',
      type: 'date',
      icon: 'images/date.svg',
    },
    {
      label: 'Time',
      placeholder: 'Select time from pricker',
      type: 'time',
      icon: 'images/clock.svg',
    },
    {
      label: 'Date & Time',
      placeholder: 'Select date & time from picker',
      type: 'datetime-local',
      icon: 'images/date-time.svg',
    },
  ];
  draggableMultiItems: {
    label: string;
    placeholder: string;
    type: string;
    icon: string;
  }[] = [
    {
      label: 'Single Selection',
      placeholder: 'Select single option.',
      type: 'radio',
      icon: 'images/single-select.svg',
    },
    {
      label: 'Multi Selection',
      placeholder: 'Select multiple options.',
      type: 'checkbox',
      icon: 'images/check-circle.svg',
    },
    {
      label: 'Dropdown',
      placeholder: 'Select options from dropdown.',
      type: 'select',
      icon: 'images/bars-solid.svg',
    },
  ];
  draggableMediaItems: {
    label: string;
    placeholder: string;
    type: string;
    icon: string;
  }[] = [
    {
      label: 'Upload',
      placeholder: 'Upload documents/media files.',
      type: 'file',
      icon: 'images/arrow-up.svg',
    },
  ];

  public ngOnInit(): void {
    this.viewJson();
  }

  onClickPreview(): void {
    this.dialog.open(Preview, {
      width: '65%',
    });
  }

  emittedNewForm(event: any): void {
    console.log(event);
    console.log(this.jsonCreated.clearAllFields());
    console.log(this.jsonCreated.getAllFields());
  }

  viewJson(): void {
    this.jsonFormat = this.jsonCreated.getAllFields();
  }
}
