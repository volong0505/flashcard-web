import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponent, TagComponent } from '../../../components';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';
import { EnglishLearningStore } from '../../../data-access/english-learning/store/english-learning.store';
import { GetEnglishFlashcardRequest } from '../../../data-access/english-learning/dtos';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

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
  selector: 'english-learning-recognition',
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
    TagComponent,
    
  ],
  templateUrl: './english-learning-recognition.html',
  styleUrl: './english-learning-recognition.css',
})
export class EnglishLearningRecognition {
  public readonly store = inject(EnglishLearningStore);

  isCorrect = signal(false);
  qualityNumber = signal<1 | 2 | 3 | 4>(3); // 
  inputStatus = signal(inputStatusSuffix.default) 

  _id: string | null = null;

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    word: this.fb.control(''),
  });

  compare(): boolean {
    const value: string = this.validateForm.value.word || '';
    
    if (value.trim().toLowerCase() === this.store.flashcard.vocabulary().word.toLowerCase()) {
      this.isCorrect.set(true);
      this.inputStatus.set(inputStatusSuffix.correct)
      return true
    } else {
      this.inputStatus.set(inputStatusSuffix.incorrect)
      this.qualityNumber.set(2)
      return false
    }
  }


  nextFlashcard() {
    const req: GetEnglishFlashcardRequest = {
      flashcardId: this.store.flashcard().vocabulary._id,
      qualityNumber: this.qualityNumber(),
    };
    this.reset();
    this.store.loadFlashcard(req);
  }

  reset() {
    this.validateForm.get("word")?.setValue('');
    this.qualityNumber.set(3);
    this.isCorrect.set(false);
    this.inputStatus.set(inputStatusSuffix.default)
  }

  onCheck() {
    if (this.compare()) {
      this.isCorrect.set(true);
    }
  }

  hint() {
    this.validateForm.get('word')?.setValue(this.store.flashcard().vocabulary.word);
    this.qualityNumber.set(1)
  }

  memorizedClick() {
    this.qualityNumber.set(4);
    this.nextFlashcard();
  }
}
