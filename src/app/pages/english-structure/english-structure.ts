import { Component } from "@angular/core";
import { EnglishStructureList } from "../../features/english-structure/english-structure-list/english-structure-list";
import { EnglishStructureCreate } from "../../features/english-structure/english-structure-create/english-structure-create";

@Component({
    selector: 'english-structure',
    imports: [
        EnglishStructureList,
        EnglishStructureCreate
    ],
    template: `
        <english-structure-create/>

        <english-structure-list/>
    `,
    styles: []
})
export class EnglishStructure {

}