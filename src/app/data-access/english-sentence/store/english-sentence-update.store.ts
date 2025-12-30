import { inject, Injectable } from "@angular/core";
import { patchState, signalState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { EnglishSentenceUpdateDto } from "../dtos";
import { catchError, EMPTY, pipe, switchMap, tap } from "rxjs";
import { EnglishSentenceService } from "../english-sentence.service";

type EnglishSentenceUpdateState = {
    onUpdate: boolean;
    isLoading: boolean;
    isUpdated: boolean;
}

const initialState: EnglishSentenceUpdateState = {
    isLoading: false,
    onUpdate: false,
    isUpdated: false
}

export const EnglishSentenceUpdateStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, service = inject(EnglishSentenceService)) => ({
        openDrawer(): void {
            patchState(store, {onUpdate: true})
        },
        closeDrawer(): void {
            patchState(store,  {onUpdate: false})
        },

        update: rxMethod<EnglishSentenceUpdateDto> (
            pipe(
                tap(() => patchState(store, {isLoading: true, isUpdated: false})),
                switchMap(body => 
                    service.update(body).pipe(
                        tap(update => {
                            patchState(store, { isLoading: false, onUpdate: false, isUpdated: true});
                        }),
                        catchError(error => {
                            patchState(store, { isLoading: false, isUpdated: false});
                            return EMPTY
                        })

                    )
                )
            )
        )
    }))
)