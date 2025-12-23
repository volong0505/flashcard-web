import { Component, effect, inject } from '@angular/core';
import { UITableComponent } from '../../../components';
import { EnglishSentenceListStore } from '../../../data-access/english-sentence/store/english-sentence-list.store';
import { EnglishSentenceCreateStore } from '../../../data-access/english-sentence/store/english-sentence-create.store';

const column = [
  {
    name: "Sentence",
    value: 'sentence'
  },
  {
    name: "Translation",
    value: "translation"
  }
]

@Component({
  selector: 'english-sentence-list',
  imports: [
    UITableComponent
  ],
  templateUrl: './english-sentence-list.html',
  styleUrl: './english-sentence-list.css',
})
export class EnglishSentenceList {
  tableColumn = column;
    pageSize = 12;

  readonly listStore = inject(EnglishSentenceListStore);
  readonly createStore = inject(EnglishSentenceCreateStore);

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

  
  pageChange($event: number) {
    this.query.page = $event;
    this.listStore.load(this.query);
  }
}
