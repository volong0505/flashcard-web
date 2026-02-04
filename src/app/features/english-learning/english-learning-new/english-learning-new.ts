import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponent,TagComponent, EnglishLevelComponent } from '../../../components';
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
     TagComponent,
        EnglishLevelComponent
  ],
  templateUrl: './english-learning-new.html',
  styleUrl: './english-learning-new.css',
})
export class EnglishLearningNew {
   readonly store = inject(EnglishLearningStore);

   nextFlashcard() {
    const params: GetEnglishFlashcardRequest = {
      flashcardId: this.store.flashcard().data._id
    }
    this.store.loadFlashcard(params)
   }

     checkExistExamples(): boolean {
    return this.store.flashcard().data.sentences.length > 0
  }
}
