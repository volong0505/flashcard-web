import { Component, Input } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'tag-component',
  imports: [
    NzTagModule
  ],
  template:`
        <nz-tag> {{tagText}}</nz-tag>
    `,
  styles: []
})
export class TagComponent {
  @Input() tagText: string | undefined = 'Tag';

  

}