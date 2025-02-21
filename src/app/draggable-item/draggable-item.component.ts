// import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'd-draggable-item',
  imports: [CommonModule],
  template: `
    <div class="mg">
      <div class="flex">
        <div
          class="draggable-item flex items-center w-10 md-lg flex-none justify-items-center content-center "
          draggable="true"
          (dragstart)="dragStart($event)"
        >
          <div
            class="rounded-sm bg-gray-300 w-8 h-8 content-center  justify-items-center "
          >
            <img
              data-src="{{ icon }}"
              alt="logo"
              [attr.width]="'15px'"
              [attr.height]="'15px'"
              loading="lazy"
            />
          </div>
        </div>
        <div
          class="w-64 flex-1 draggable-item flex items-center"
          draggable="true"
          (dragstart)="dragStart($event)"
        >
          <div class="flex-col ">
            <div class="text-base text-gray-900 ">{{ label }}</div>
            <div class="text-sm text-gray-400 ">{{ placeholder }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .image-background {
        background-color: #ebebeb;
      }
      .mg {
        margin: 0% 0% 1.4% 10%;
      }
      .draggable-item {
        /* padding: 1%; */
        margin: 0% 0% 0% 2%;
        border: 0px solid #ccc;
        cursor: move;
      }
    `,
  ],
})
export class DraggableItemComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';
  @Input() icon: string = '';
  @Input() description: string = '';
  dragStart(event: DragEvent): void {
    event.dataTransfer?.setData(
      'text/plain',
      JSON.stringify({ label: this.label })
    );
  }
}
