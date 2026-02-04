import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ButtonComponent } from '../../../components';
import { EnglishSentenceCreateStore } from '../../../data-access/english-sentence/store/english-sentence-create.store';
import { EnglishSentenceCreateDto } from '../../../data-access/english-sentence/dtos';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EnglishDictionaryOptionsStore } from '../../../data-access/english-dictionary/store/english-dictionary-options.store';
import { EnglishDictionaryGetOptionsItemDto } from '../../../data-access/english-dictionary/dtos/get-options';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';


@Component({
  selector: 'english-sentence-create',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzDrawerModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './english-sentence-create.html',
  styleUrl: './english-sentence-create.css',
})
export class EnglishSentenceCreate {
  private fb = inject(NonNullableFormBuilder);

  readonly createStore = inject(EnglishSentenceCreateStore)
  readonly wordOptionsStore = inject(EnglishDictionaryOptionsStore);

  validateForm = this.fb.group({
    sentence: this.fb.control('', [Validators.required]),
    translation: this.fb.control('', [Validators.required]),
    words: this.fb.control([]),
  });

   readonly listOfOption: string[] = [];

  submitForm() {
    if (this.validateForm.valid) {
      const request: EnglishSentenceCreateDto = {
        sentence: this.validateForm.value.sentence || '',
        translation: this.validateForm.value.translation || '',
        wordIds: this.validateForm.value?.words?.map((e: EnglishDictionaryGetOptionsItemDto) => e._id) || []
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

    selectOnSearch(keyword: string) {
    if (keyword.trim().length > 2) {
      this.wordOptionsStore.getOptions({
        keyword: keyword,
      })
    }
  }

  closeDrawer() {
    this.createStore.closeDrawer();
  }
}
