import { Component } from "@angular/core";
import { EnglishLearning } from "../../features/english-learning/english-learning";

@Component({
    selector: 'learn-component',
    imports: [
      EnglishLearning
    ],
    standalone: true,
    template: `
    <english-learning/>
      `,
})
export class Learn { }