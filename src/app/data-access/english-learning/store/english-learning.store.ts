import { inject } from "@angular/core";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { lastValueFrom } from "rxjs";
import { EnglishFlashcardDto, EnglishLearningVocabularyDto, GetEnglishFlashcardRequest } from "../dtos";
import { EnglishLearningService } from "../english-learning.service";

type EnglishLearningState = {
    flashcard: {
        data: EnglishFlashcardDto,
        isLoading: boolean
    };
    update: {
        isLoading: boolean
    }
}

const initialState: EnglishLearningState = {
    flashcard: {
        data: {} as EnglishFlashcardDto,
        isLoading: false
    },
    update: {
        isLoading: false
    }
}

export const EnglishLearningStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, service = inject(EnglishLearningService)) => ({
        async loadFlashcard(params: GetEnglishFlashcardRequest): Promise<any> {
            patchState(store, { flashcard: { ...store.flashcard(), isLoading: true } });
            try {
                const res$ = service.getVocabulary(params);
                const res = await lastValueFrom(res$);
                patchState(store, { flashcard: { ...store.flashcard(), isLoading: false, data: res.flashcard || null } });
            } catch (error) {
                patchState(store, { flashcard: { ...store.flashcard(), isLoading: false, data: {} as EnglishFlashcardDto } });
            }
        }
    }))
)
