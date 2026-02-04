import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponent } from '../../../components';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';
import { EnglishLearningStore } from '../../../data-access/english-learning/store/english-learning.store';
import { GetEnglishFlashcardRequest } from '../../../data-access/english-learning/dtos';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { areSentencesEqual } from '../../../_shared';
import { TextToSpeech } from '../../text-to-speech/text-to-speech/text-to-speech';

const inputStatusSuffix = {
  default: {
    type: '', color: ''
  },
  correct: {
    type: 'check', color: '#1677ff'
  },
  incorrect: {
    type: 'exclamation', color: '#d9363e'
  }
}

@Component({
  selector: 'english-learning-sentence-rewriting',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzDescriptionsModule,
    NzInputModule,
    NzIconModule,
    NzFlexModule,
    NzCardModule,
    NzFormModule,

    ButtonComponent,
    TextToSpeech
  ],
  templateUrl: './english-learning-sentence-rewriting.html',
  styleUrl: './english-learning-sentence-rewriting.css',
})
export class EnglishLearningSentenceRewriting {
 public readonly store = inject(EnglishLearningStore);

  isCorrect = signal(false);
  qualityNumber = signal<1 | 2 | 3 | 4>(3); // 
  inputStatus = signal(inputStatusSuffix.default);
  showSentence = false;
  _id: string | null = null;

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    sentence: this.fb.control(''),
  });

  nextFlashcard() {
    const req: GetEnglishFlashcardRequest = {
      flashcardId: this.store.flashcard().data._id,
      sentenceId: this.store.flashcard().data.sentence?._id,
      qualityNumber: this.qualityNumber(),
    };
    this.reset();
    this.store.loadFlashcard(req);
  }

  reset() {
    this.validateForm.get("sentence")?.setValue('');
    this.qualityNumber.set(3);
    this.isCorrect.set(false);
    this.showSentence = false;
    this.inputStatus.set(inputStatusSuffix.default)
  }

  onCheck() {
    if (this.compare()) {
      this.isCorrect.set(true);
      this.inputStatus.set(inputStatusSuffix.correct)
    } else {
      this.inputStatus.set(inputStatusSuffix.incorrect)
    }
  }

  hint() {
    this.showSentence = true
  }

  compare(): boolean {
    const value: string = this.validateForm.value.sentence || '';
    return areSentencesEqual(value, this.store.flashcard().data.sentence?.sentence || '')
  }

}
