import { Component, effect, inject, signal } from '@angular/core';
import { ButtonComponent, UITableComponent } from '../../../components';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EnglishDictionaryCreateStore } from '../../../data-access/english-dictionary/store/english-dictionary-create.store';
import { EnglishDictionaryListStore } from '../../../data-access/english-dictionary/store/english-dictionary-list.store';
import { AuthSerivce } from '../../../data-access/auth/auth.service';

const customColumn = [
  {
    name: "Word",
    value: 'word'
  },
  {
    name: "Translation",
    value: "translation"
  },
  {
    name: "Category",
    value: "category"
  },
  {
    name: "IPA",
    value: "ipa"
  },
  {
    name: "Level",
    value: "level"
  },

]


@Component({
  selector: 'english-dictionaries',
  imports: [
  ButtonComponent,

    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    NzFlexModule,
    NzDividerModule,
    NzPaginationModule,
    NzGridModule,
    ReactiveFormsModule,

    UITableComponent
  ],
  templateUrl: './english-dictionaries.html',
  styleUrl: './english-dictionaries.css',
})
export class EnglishDictionaries {
  tableColumn = customColumn;
  pageSize = 12;

  data = signal<any>({ list: [], total: 0 });
  query = {
    userId: '',
    keyword: '',
    page: 1
  }

  expandSet = new Set<string>();
  keyword: string = '';

  private fb = inject(NonNullableFormBuilder);
  readonly createState = inject(EnglishDictionaryCreateStore);
  readonly listStore = inject(EnglishDictionaryListStore);
  readonly authService = inject(AuthSerivce);

  searchForm = this.fb.group({
    keyword: this.fb.control(''),
  });
  
  constructor() {
    this.query.userId = this.authService.getUserId();
    this.listStore.load(this.query)

    effect(() => {
      const isCreated = this.createState.isCreated();
      if (isCreated) this.listStore.load(this.query) // This code runs whenever isCreated is true
    });
  }

  submitForm(): void {
    if (this.keyword !== this.searchForm.value.keyword) {
      this.keyword = this.searchForm.value.keyword || '';
    }
  }

  pageChange($event: number) {
    this.query.page = $event;
    this.listStore.load(this.query);
  }

  onEdit(id: string) {

  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  openDrawer() {
    this.createState.openDrawer()
  }

  transform(text: string, character: string): string[] {
    return text.split(character)
  }
}
