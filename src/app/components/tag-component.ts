import { Component, Input } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'tag-component',
  imports: [
    NzTagModule
  ],
  template:`
        <nz-tag nzColor="processing"> {{tagText}}</nz-tag>
    `,
   styles: [
        `
            nz-tag {
                font-size: 12px;
                font-weight: 500;
                text-transform: uppercase;
            }
        `
    ]
})
export class TagComponent {
  @Input() tagText: string | undefined = 'Tag';
  
}