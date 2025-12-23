import { inject } from "@angular/core";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { lastValueFrom } from "rxjs";
import { EnglishLearningVocabularyDto, GetEnglishFlashcardRequest } from "../dtos";
import { EnglishLearningService } from "../english-learning.service";

type EnglishLearningState = {
    flashcard: {
        vocabulary: EnglishLearningVocabularyDto,
        isLoading: boolean
    };
    update: {
        isLoading: boolean
    }
}

const initialState: EnglishLearningState = {
    flashcard: {
        vocabulary: {} as EnglishLearningVocabularyDto,
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
        // loadVocabulary: rxMethod(
        //     pipe(
        //         debounceTime(300),
        //         distinctUntilChanged(),
        //         tap(() => patchState(store, { flashcard: { ...store.flashcard(), isLoading: true } }),
        //             switchMap(() => {
        //                 return service.getVocabulary().pipe(
        //                     tapResponse({
        //                         next: (vocaulary) => patchState(store, { flashcard: { ...store.flashcard(), vocabulary: vocaulary } }),
        //                         error: console.error,
        //                         finalize: () => patchState(store, { flashcard: { ...store.flashcard(), isLoading: true } })

        //                     })
        //                 )
        //             })
        //         )
        //     )
        // )
        async loadFlashcard(params: GetEnglishFlashcardRequest): Promise<any> {
            patchState(store, {flashcard: {...store.flashcard(), isLoading: true}});
             try {
                            const res$ = service.getVocabulary(params);
                            const res = await lastValueFrom(res$);
                            patchState(store, { flashcard: { ...store.flashcard(), isLoading: false, vocabulary: res || null}});
                        } catch (error) {
                            patchState(store, { flashcard: { ...store.flashcard(), isLoading: false, vocabulary: {} as EnglishLearningVocabularyDto}});
                    }
        }
    }))
)
