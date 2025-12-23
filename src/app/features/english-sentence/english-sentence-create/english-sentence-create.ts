import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ButtonComponent } from '../../../components';
import { EnglishSentenceCreateStore } from '../../../data-access/english-sentence/store/english-sentence-create.store';
import { EnglishSentenceCreateDto } from '../../../data-access/english-sentence/dtos';

@Component({
  selector: 'english-sentence-create',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzFormModule,

    ButtonComponent
  ],
  templateUrl: './english-sentence-create.html',
  styleUrl: './english-sentence-create.css',
})
export class EnglishSentenceCreate {
  private fb = inject(NonNullableFormBuilder);

  private readonly createStore = inject(EnglishSentenceCreateStore)

  validateForm = this.fb.group({
    sentence: this.fb.control('', [Validators.required]),
    translation: this.fb.control('', [Validators.required]),
  });


  submitForm() {
    if (this.validateForm.valid) {
      const request: EnglishSentenceCreateDto = {
        sentence: this.validateForm.value.sentence || '',
        translation: this.validateForm.value.translation || '',

      };
      this.createStore.create(request);
      this.resetForm()

    } else {
      this.validateForm.markAllAsTouched();
    }
  }
   resetForm() {
    this.validateForm.reset();
  }
}
