import { Component } from "@angular/core";
import { EnglishSentenceList } from "../../features/english-sentence/english-sentence-list/english-sentence-list";
import { EnglishSentenceCreate } from "../../features/english-sentence/english-sentence-create/english-sentence-create";

@Component({
    selector: 'english-sentence',
    imports: [
        EnglishSentenceList,
        EnglishSentenceCreate
    ],
    template: `
    <english-sentence-create/>
    <english-sentence-list/>
    `,
    styles: []
})
export class EnglishSentence {

}