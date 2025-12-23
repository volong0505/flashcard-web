import { Component } from "@angular/core";
import { EnglishDictionaries } from "../../features/english/english-dictionaries/english-dictionaries";
import { EnglishDictionaryCreate } from "../../features/english/english-dictionary-create/english-dictionary-create";


@Component({
    selector: 'english-dictionary',
    imports: [
        EnglishDictionaries,
        EnglishDictionaryCreate
    ],
    template: `
    <english-dictionary-create/>
    <english-dictionaries/>
    `,
    styles: []
})
export class EnglishDictionary {

}