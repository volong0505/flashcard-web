import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { EnglishDictionaryCreateStore } from '../../../data-access/english-dictionary/store/english-dictionary-create.store';
import { EnglishDictionaryCreateDto } from '../../../data-access/english-dictionary/dtos';
import { AuthSerivce } from '../../../data-access/auth/auth.service';


@Component({
  selector: 'english-dictionary-create',
  imports: [
    NzDrawerModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzTypographyModule,
    NzSelectModule,
    NzButtonModule,
    NzDividerModule,
    NzSpinModule,
    NzTagModule,
    NzAlertModule,

    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './english-dictionary-create.html',
  styleUrl: './english-dictionary-create.css',
  providers: [

  ]
})
export class EnglishDictionaryCreate {
  private fb = inject(NonNullableFormBuilder);
  createState = inject(EnglishDictionaryCreateStore);
  authService = inject(AuthSerivce)


  isSpinning = false;
  visible = true;

  inputVisible = false;
  inputValue = '';
  isExisted = {
    status: false
  }

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  englishCategoryOptions = [
    { label: 'Noun', value: 'noun' },
    { label: 'Verb', value: 'verb' },
    { label: 'Adjective', value: 'adjective' },
    { label: 'Adverb', value: 'adverb' },
    { label: 'Phrasal verb', value: 'phrasal verb' },
    { label: 'Idiom', value: 'idiom' },
    { label: 'Structure', value: 'structure' },
    { label: 'Pronoun', value: 'pronoun' },
    { label: 'Preposition', value: 'preposition' },
    { label: 'Conjunction', value: 'conjunction' },
    { label: 'Interjection', value: 'interjection' },
  ];

  validateForm = this.fb.group({
    word: this.fb.control('', [Validators.required]),
    translation: this.fb.control('', [Validators.required]),
    definition: this.fb.control(''),
    ipa: this.fb.control(''),
    level: this.fb.control(''),
    usageNote: this.fb.control(''),
    category: this.fb.control(''),
  });

  constructor() {
  }

  close() {
    this.visible = false
  }

  // ngOnDestroy() {
  //   this.validateForm.reset(); // 🧹 Clear form value
  //   this.askAIForm.reset(); // 🧹 Clear AI form value
  //   this.definitions = []; // 🧹 Clear definitions
  // }

  submitForm() {
    if (this.validateForm.valid) {
      const request: EnglishDictionaryCreateDto = {
        ...this.validateForm.value,
        word: this.validateForm.value.word || '',
        translation: this.validateForm.value.translation || '',
      };
      this.createState.create(request);
      this.resetForm()

    } else {
      this.validateForm.markAllAsTouched();
    }
  }



  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  closeDrawer() {
    this.createState.closeDrawer()
  }

  resetForm() {
    this.validateForm.reset();
  }
}
