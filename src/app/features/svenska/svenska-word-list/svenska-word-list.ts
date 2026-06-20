import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ButtonComponent } from '../../../components';
import { AuthSerivce } from '../../../data-access/auth/auth.service';

@Component({
  selector: 'svenska-word-list',
  imports: [  ButtonComponent,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    NzFlexModule,
    NzDividerModule,
    NzPaginationModule,
    NzGridModule,
    ReactiveFormsModule
  ],
  templateUrl: './svenska-word-list.html',
  styleUrl: './svenska-word-list.css',
})


export class SvenskaWordList {
  
// tableColumn = customColumn;
//   pageSize = 12;

//   data = signal<any>({ list: [], total: 0 });
//   query = {
//     userId: '',
//     keyword: '',
//     page: 1
//   }

//   expandSet = new Set<string>();

//   private fb = inject(NonNullableFormBuilder);
//   readonly createState = inject(EnglishDictionaryCreateStore);
//   readonly listStore = inject(EnglishDictionaryListStore);
//   readonly detailStore = inject(EnglishDictionaryDetailStore)
//   readonly authService = inject(AuthSerivce);

//   searchForm = this.fb.group({
//     keyword: this.fb.control(''),
//   });
  
//   constructor() {
//     this.query.userId = this.authService.getUserId();
//     this.listStore.load(this.query)

//     effect(() => {
//       const isCreated = this.createState.isCreated();
//       if (isCreated) this.listStore.load(this.query) // This code runs whenever isCreated is true
//     });
//   }

//   submitForm(): void {
//     if (this.query.keyword !== this.searchForm.value.keyword) {
//       this.query.keyword = this.searchForm.value.keyword || '';
//     }
//     this.listStore.load(this.query)
//   }

//   pageChange($event: number) {
//     this.query.page = $event;
//     this.listStore.load(this.query);
//   }

//   onEdit(id: string) {

//   }

//   loadDetail(_id: string) {
//     this.detailStore.openDrawer(_id)
//   }

//   onExpandChange(id: string, checked: boolean): void {
//     if (checked) {
//       this.expandSet.add(id);
//     } else {
//       this.expandSet.delete(id);
//     }
//   }

//   openDrawer() {
//     this.createState.openDrawer()
//   }

//   transform(text: string, character: string): string[] {
//     return text.split(character)
//   }
// }


// const customColumn = [
//   {
//     name: "",
//     value: '',
//     width: "2%"
//   },
//   {
//     name: "Word",
//     value: 'word',
//     width: "15%"
//   },
//   {
//     name: "Translation",
//     value: "translation",
//     width: "20%"
//   },
//   {
//     name: "Category",
//     value: "category",
//     width: "5%"
//   },
//    {
//     name: "Topics",
//     value: "topics",
//     width: "10%"
//   },
//    {
//     name: "Definition",
//     value: "definition",
//     width: "30%"
//   }
// ]
}
