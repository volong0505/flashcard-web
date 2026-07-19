import { Component } from "@angular/core";
import { EnglishDictionaries } from "../../features/english/english-dictionaries/english-dictionaries";
import { EnglishDictionaryCreate } from "../../features/english/english-dictionary-create/english-dictionary-create";
import { EnglishDictionaryDetail } from "../../features/english/english-dictionary-detail/english-dictionary-detail";


@Component({
    selector: 'english-dictionary',
    imports: [
        EnglishDictionaries,
        EnglishDictionaryCreate,
        EnglishDictionaryDetail
    ],
    template: `
    <english-dictionary-create/>
    <english-dictionaries/>
    <english-dictionary-detail/>

    `,
    styles: []
})
export class EnglishDictionary {

}