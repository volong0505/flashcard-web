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
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EnglishStructureCreateStore } from '../../../data-access/english-structure/store/english-structure-create.store';

const column = [
   {
    name: "Structure",
    value: 'structure',
    colType: "default"
  },
  {
    name: "Formula",
    value: 'formula',
    colType: "default"
  },
  {
    name: "Description ",
    value: "description",
    colType: "default"
  }
]

@Component({
  selector: 'english-structure-list',
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
  templateUrl: './english-structure-list.html',
  styleUrl: './english-structure-list.css',
})
export class EnglishStructureList {
    readonly createState = inject(EnglishStructureCreateStore);
  
}
