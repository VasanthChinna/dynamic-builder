import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './remove-modal.component.html',
  imports: [MatDialogModule, MatButtonModule],
})
export class RemoveModalComponent {}
