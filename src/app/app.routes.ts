import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { NewFromComponent } from './new-from/new-from.component';

export const routes: Routes = [
  { path: '', component: AppComponent },

  { path: 'dropzone', component: DropZoneComponent },
  { path: 'newform', component: NewFromComponent },
];
