import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'button-component',
  imports: [
    NzButtonModule
  ],
  template:`
  <button nz-button [disabled]="disabled" nzType="primary" (click)="onClick()">{{buttonText}}</button>
  `,
  styles: [
    `
    button {
    background-color: rgb(35, 131, 226);
    border-radius: 6px;
    width: 5em;
      }
  `
  ]
})
export class ButtonComponent {
  @Input() buttonText: string = 'Button';
  @Input() disabled: boolean = false;
  @Output() shareClicked = new EventEmitter<void>();

  onClick(): void {
    this.shareClicked.emit();
  }
}