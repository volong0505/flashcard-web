import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { EnglishStructureCreateStore } from '../../../data-access/english-structure/store/english-structure-create.store';

@Component({
  selector: 'english-structure-create',
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
  templateUrl: './english-structure-create.html',
  styleUrl: './english-structure-create.css',
})
export class EnglishStructureCreate {

  private fb = inject(NonNullableFormBuilder);
  createState = inject(EnglishStructureCreateStore);

  validateForm = this.fb.group({
    structure: this.fb.control('', [Validators.required]),
    formula: this.fb.control('', [Validators.required]),
    definition: this.fb.control(''),
  });

  closeDrawer() {
    this.createState.closeDrawer()
  }

  submitForm() {
      if (this.validateForm.valid) {
        const request: any = {
          ...this.validateForm.value
        };
        // this.createState.create(request);
        this.resetForm()
  
      } else {
        this.validateForm.markAllAsTouched();
      }
    }

    resetForm() {
    this.validateForm.reset();
  }
}
