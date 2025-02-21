import { Injectable, signal } from '@angular/core';
import { FormcontrolInterface } from '../interfaces/formcontrol.interface';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormsService {
  // clear fields in drop zone
  private formSource = new Subject<any>();
  newFormClick = new Subject();
  formsList$ = this.formSource.asObservable();

  // create default fields
  private defaultFormSource = new Subject<any>();
  defaultFormList = new Subject();
  currentFormProfile$ = this.defaultFormSource.asObservable();

  // display form data
  private existingFormSource = new Subject<any>();
  existingFormList = new Subject();
  existingFormProfile$ = this.existingFormList.asObservable();

  addToFormsList(data: any) {
    console.log(data);
    this.formSource.next(this.formsList$);
  }
}
