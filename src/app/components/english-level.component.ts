import { Component, Input, OnInit, signal } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
    selector: 'english-level-component',
    imports: [
        NzTagModule
    ],
    template: `
        <nz-tag [nzColor]='this.color()'> {{level}}</nz-tag>
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
export class EnglishLevelComponent implements OnInit {
    @Input() level: string | undefined = 'A1';

    color = signal<string>('blue')
    ngOnInit(): void {
        switch (this.level) {
            case 'A1':
                this.color.set('blue');
                break;
            case 'A2':
                this.color.set('geekblue');
                break;
            case 'B1':
                this.color.set('green');
                break;
            case 'B2':
                this.color.set('cyan');
                break;
            case 'C1':
                this.color.set('orange');
                break;
            case 'C2':
                this.color.set('red');
                break;
        }
    }
}