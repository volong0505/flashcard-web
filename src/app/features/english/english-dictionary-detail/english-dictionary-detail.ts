import { Component, inject } from '@angular/core';
import { EnglishDictionaryDetailStore } from '../../../data-access/english-dictionary/store/english-dictionary-detail.store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzListModule } from 'ng-zorro-antd/list';
import { EnglishCategoryComponent } from '../../../components/english-category.component';
import { EnglishLevelComponent } from '../../../components/english-level.component';
import { DatePipe } from '@angular/common';
import { TagComponent } from '../../../components';

@Component({
  selector: 'english-dictionary-detail',
  imports: [
    NzButtonModule, 
    NzDescriptionsModule, 
    NzDividerModule, 
    NzDrawerModule, 
    NzListModule,
  
    EnglishCategoryComponent,
    EnglishLevelComponent,
    TagComponent,
    DatePipe
  ],
  templateUrl: './english-dictionary-detail.html',
  styleUrl: './english-dictionary-detail.css',
})
export class EnglishDictionaryDetail {
  readonly detailStore = inject(EnglishDictionaryDetailStore);
    open(): void {
    // this.visible = true;
  }

  close(): void {
    this.detailStore.closeDrawer()
  }

  check(): boolean {
    return !!this.detailStore.detail()
  }
}
