import { Component } from "@angular/core";
import { SvenskaWordList } from "../../features/svenska/svenska-word-list/svenska-word-list";

@Component({
    selector: 'svenska-dictionary-page',
    standalone: true,
    imports: [
        SvenskaWordList
    ],
    template: `<svenska-word-list/>`

})
export class SvenskaDictionaryPage {}