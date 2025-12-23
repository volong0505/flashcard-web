import { Component, inject } from "@angular/core";
import { EnglishLearningRecognition } from "./english-learning-recognition/english-learning-recognition";
import { EnglishLearningStore } from "../../data-access/english-learning/store/english-learning.store";
import { EnglishLearningNew } from "./english-learning-new/english-learning-new";
import { NoMoreFlashcardComponent } from "../../components";

@Component({
    selector: 'english-learning',
    imports: [
        EnglishLearningNew,
        EnglishLearningRecognition,
        NoMoreFlashcardComponent
    ],
    template: `
    <div class=ctn>

        @if (!state.flashcard().vocabulary._id ) {
        <no-more-flashcard-component/>
        }

        @if (state.flashcard().vocabulary.cardType == "NEW") {
            <english-learning-new/>
        }

        @if (state.flashcard().vocabulary.cardType == "RECOGNITION") {
            <english-learning-recognition/>
        }
     </div>
    `,
    styles: [
        `
            .ctn {
                padding-top: 5em
            }
        `
    ]
})
export class EnglishLearning {
    readonly state = inject(EnglishLearningStore);

    constructor() {
        this.state.loadFlashcard({})
    }

}