import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponent } from '../../../components';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';
import { EnglishLearningStore } from '../../../data-access/english-learning/store/english-learning.store';
import { GetEnglishFlashcardRequest } from '../../../data-access/english-learning/dtos';

@Component({
  selector: 'english-learning-new',
  imports: [
      CommonModule,
    NzDescriptionsModule,
    NzIconModule,
    NzFlexModule,
    NzCardModule,

    ButtonComponent,
  ],
  templateUrl: './english-learning-new.html',
  styleUrl: './english-learning-new.css',
})
export class EnglishLearningNew {
   readonly state = inject(EnglishLearningStore);

   nextFlashcard() {
    const params: GetEnglishFlashcardRequest = {
      flashcardId: this.state.flashcard().data._id
    }
    this.state.loadFlashcard(params)
   }
}
