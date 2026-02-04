import { Component, effect, inject } from '@angular/core';
import { EnglishSentenceListStore } from '../../../data-access/english-sentence/store/english-sentence-list.store';
import { EnglishSentenceCreateStore } from '../../../data-access/english-sentence/store/english-sentence-create.store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ButtonComponent, TagComponent } from '../../../components';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EnglishSentenceUpdateStore } from '../../../data-access/english-sentence/store/english-sentence-update.store';
import { EnglishSentenceUpdateDto } from '../../../data-access/english-sentence/dtos';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { EnglishDictionaryOptionsStore } from '../../../data-access/english-dictionary/store/english-dictionary-options.store';
import { EnglishDictionaryGetOptionsItemDto } from '../../../data-access/english-dictionary/dtos/get-options';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';

const column = [
  {
    name: "Sentence",
    value: 'sentence',
    colType: "default"
  },
  {
    name: "Translation",
    value: "translation",
    colType: "default"
  },
  {
    name: "Words used",
    value: "words",
    colType: "tags"
  }
]

@Component({
  selector: 'english-sentence-list',
  imports: [
    TagComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTableModule,
    NzSelectModule, 
    NzPaginationModule,
    NzFormModule,
    NzFlexModule,
    NzDividerModule,
  ],
  templateUrl: './english-sentence-list.html',
  styleUrl: './english-sentence-list.css',
})
export class EnglishSentenceList {
  tableColumn = column;
  pageSize = 12;
  listOfOption: {_id: string, word: string; translation: string}[] = [];
  private fb = inject(NonNullableFormBuilder);

  readonly listStore = inject(EnglishSentenceListStore);
  readonly createStore = inject(EnglishSentenceCreateStore);
  readonly updateStore = inject(EnglishSentenceUpdateStore);
  readonly wordOptionsStore = inject(EnglishDictionaryOptionsStore);

  searchForm = this.fb.group({
    keyword: this.fb.control(''),
  });
  
  query = {
    userId: '',
    keyword: '',
    page: 1
  }

  constructor() {
    this.listStore.load(this.query)

    effect(() => {
      const isCreated = this.createStore.isCreated();
      if (isCreated) this.listStore.load(this.query) // This code runs whenever isCreated is true
    });
  }

  pageChange($event: any) {
    this.query.page = $event;
    this.listStore.load(this.query);
  }

    submitForm(): void {
    if (this.query.keyword !== this.searchForm.value.keyword) {
      this.query.keyword = this.searchForm.value.keyword || '';
    }
    this.listStore.load(this.query)
  }

  i = 0;
  editCol: 'sentence' | 'translation' | 'wordIds' | null = null;
  editId: string = ''

  startEdit(id: string, colName: 'sentence' | 'translation' | 'wordIds'): void {
    this.editId = id;
    this.editCol = colName
  }

  stopEdit(value: any): void {
    if (!this.editCol) return;
    const body: EnglishSentenceUpdateDto = {
      _id: this.editId,
      update: {
        key: this.editCol,
        value: value
      }
    }
    this.updateStore.update(body)
    this.editId = '';
  }

  changeWords(value: EnglishDictionaryGetOptionsItemDto[]) {
    if (!this.editCol) return;
    const body: EnglishSentenceUpdateDto = {
      _id: this.editId,
      update: {
        key: this.editCol,
        value: value.map(e => e._id)
      } 
    }
    this.updateStore.update(body)
  }

  handleOpenChange(open: boolean) {
    if (!open) {
      // Call the native blur method on the component's internal input element
      this.editId = '';
    }
  }

  selectOnSearch(keyword: string) {
    if (keyword.trim().length > 2) {
      this.wordOptionsStore.getOptions({
        keyword: keyword,
      })
    }
  }
}
