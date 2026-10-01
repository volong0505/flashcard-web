import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TextToSpeech } from '../../text-to-speech/text-to-speech/text-to-speech';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { areSentencesEqual } from '../../../_shared';

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
    NzSpaceModule,
    NzCollapseModule,
    TextToSpeech
  ],
  templateUrl: './english-learning-sentence-rewriting.html',
  styleUrl: './english-learning-sentence-rewriting.css',
})
export class EnglishLearningSentenceRewriting {
  @Input() sentence: {_id: string | null, translation: string, sentence: string};

  isCorrect = signal(false);
  qualityNumber = signal<1 | 2 | 3 | 4>(3); // 
  inputStatus = signal(inputStatusSuffix.default);
  showSentence = false;
  _id: string | null = null;

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    sentence: this.fb.control(''),
  });

 onCheck(event: Event)  {
  const target = event.target as HTMLInputElement;
    if (areSentencesEqual(target.value, this.sentence.sentence || '')) {
      this.isCorrect.set(true);
      this.inputStatus.set(inputStatusSuffix.correct)
    } else {
      this.inputStatus.set(inputStatusSuffix.incorrect)
    }
  }

}
