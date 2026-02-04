import { Component, Input, OnInit, signal } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
    selector: 'english-category-component',
    imports: [
        NzTagModule
    ],
    template: `
        <nz-tag [nzColor]='this.color()'> {{category}}</nz-tag>
    `,
    styles: [
        `
            nz-tag {
                font-size: 12px;
                font-weight: 500;
                text-transform: uppercase;
            }
        `
    ]
})
export class EnglishCategoryComponent implements OnInit {
    @Input() category: string | undefined = 'A1';

    color = signal<string>('processing')

    ngOnInit(): void {
        switch (this.category) {
            case 'noun':
                this.color.set('blue');
                break;
            case 'verb':
                this.color.set('green');
                break;
            case 'adjective':
                this.color.set('orange');
                break;
            case 'collocation':
                this.color.set('geekblue');
                break;
        }
    }
}