import { Component } from "@angular/core";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";

@Component({
    selector: 'english-learning-loading',
    imports: [
        NzCardModule,
        NzSkeletonModule
    ],
    template: `
    <nz-card>
        <nz-skeleton [nzActive]="true"></nz-skeleton>

    </nz-card>
    `,
    styles: [
        `
        nz-card {
        background-color: rgb(255, 255, 255);
        width: 700px;
        height: 200px;
        margin: auto;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 12px 32px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
        border-radius: 12px;
        position: relative;
}
        `
    ]
})
export class EnglishLearningLoading { }