import { Component, effect, inject } from '@angular/core';
import { EnglishSentenceListStore } from '../../../data-access/english-sentence/store/english-sentence-list.store';
import { EnglishSentenceCreateStore } from '../../../data-access/english-sentence/store/english-sentence-create.store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { TagComponent } from '../../../components';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EnglishSentenceUpdateStore } from '../../../data-access/english-sentence/store/english-sentence-update.store';
import { EnglishSentenceUpdateDto } from '../../../data-access/english-sentence/dtos';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

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
    FormsModule, NzButtonModule, NzInputModule, NzPopconfirmModule, NzTableModule, NzSelectModule, NzPaginationModule
  ],
  templateUrl: './english-sentence-list.html',
  styleUrl: './english-sentence-list.css',
})
export class EnglishSentenceList {
  tableColumn = column;
  pageSize = 12;
  readonly listOfOption: string[] = [];

  readonly listStore = inject(EnglishSentenceListStore);
  readonly createStore = inject(EnglishSentenceCreateStore);
  readonly updateStore = inject(EnglishSentenceUpdateStore)

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

  i = 0;
  editId: string = '';
  editCol: string = ''

  startEdit(id: string, colName: string): void {
    this.editId = id;
    this.editCol = colName
  }

  stopEdit(value: any): void {
    const body: EnglishSentenceUpdateDto = {
      _id: this.editId,
      update: {
        [this.editCol]: value
      }
    }
    this.updateStore.update(body)
    this.editId = '';
  }


  changeWords(value: any) {
    const body: EnglishSentenceUpdateDto = {
      _id: this.editId,
      update: {
        [this.editCol]: value
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
}
