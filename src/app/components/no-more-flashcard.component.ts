import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'no-more-flashcard-component',
  imports: [NzButtonModule, NzResultModule, NzCardModule],
  template: `
    <nz-card>
    <nz-result
      nzStatus="success"
      nzTitle="Well done! We've finished the flashcards "
    >
      
     </nz-result>
    </nz-card>
  `,
  styles: [
    `
    nz-card {
  background-color: rgb(255, 255, 255);
  width: 700px;
  height: auto;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 12px 32px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 12px;
  position: relative;
}
`
  ]
})
export class NoMoreFlashcardComponent {}