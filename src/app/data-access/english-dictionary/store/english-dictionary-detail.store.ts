import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, EMPTY, pipe, switchMap, tap } from "rxjs";
import { EnglishDictionaryService } from "../english-dictionary.service";
import { EnglishDictionaryDetailResponse } from "../dtos";

type EnglishDictionaryDetailState = {
    isLoading: boolean;
    isOpen: boolean;
    detail: EnglishDictionaryDetailResponse | null
}

const initialState: EnglishDictionaryDetailState = {
    isLoading: false,
    isOpen: false,
    detail: null
}

export const EnglishDictionaryDetailStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, service = inject(EnglishDictionaryService)) => ({

        closeDrawer(): void {
            patchState(store,  {isOpen: false})
        },

        openDrawer: rxMethod<string> (
            pipe(
                tap(() => patchState(store, {isLoading: true, isOpen: true})),
                switchMap(_id => 
                    service.getOne(_id).pipe(
                        tap(res => {
                            patchState(store, { isLoading: false, detail: res});
                        }),
                        catchError(error => {
                            patchState(store, { isLoading: false});
                            return EMPTY
                        })

                    )
                )
            )
        )
    }))
)