import { Component, inject } from "@angular/core";
import { EnglishLearningRecognition } from "./english-learning-recognition/english-learning-recognition";
import { EnglishLearningStore } from "../../data-access/english-learning/store/english-learning.store";
import { EnglishLearningNew } from "./english-learning-new/english-learning-new";
import { NoMoreFlashcardComponent } from "../../components";
import { EnglishLearningSentenceRewriting } from "./english-learning-sentence-rewriting/english-learning-sentence-rewriting";
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { EnglishLearningLoading } from "./english-learning-loading";

@Component({
    selector: 'english-learning',
    imports: [
        EnglishLearningNew,
        EnglishLearningRecognition,
        EnglishLearningSentenceRewriting,
        EnglishLearningLoading,
        NoMoreFlashcardComponent,

        NzSkeletonModule
    ],
    template: `
    <div class=ctn>
        @if (state.flashcard().isLoading) {
        <english-learning-loading/>
        } @else {
            @if (state.flashcard().data.cardType == "NEW") {
                <english-learning-new/>
            }

            @if (state.flashcard().data.cardType == "RECOGNITION") {
                <english-learning-recognition/>
            }

            @if (state.flashcard().data.cardType == "MEMORIZED") {
                <english-learning-recognition/>
            }

            @if (state.flashcard().data.sentence?._id) {
                <english-learning-sentence-rewriting/>
            }

            @if (!state.flashcard().data._id && !state.flashcard().data.sentence?._id ) {
                <no-more-flashcard-component/>
            }
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