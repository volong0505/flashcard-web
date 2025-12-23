import { inject, Injectable } from "@angular/core";
import { patchState, signalState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { EnglishSentenceCreateDto } from "../dtos";
import { catchError, EMPTY, pipe, switchMap, tap } from "rxjs";
import { EnglishSentenceService } from "../english-sentence.service";

type EnglishSentenceCreateState = {
    onCreate: boolean;
    isLoading: boolean;
    isCreated: boolean;
}

const initialState: EnglishSentenceCreateState = {
    isLoading: false,
    onCreate: false,
    isCreated: false
}

export const EnglishSentenceCreateStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, service = inject(EnglishSentenceService)) => ({
        openDrawer(): void {
            patchState(store, {onCreate: true})
        },
        closeDrawer(): void {
            patchState(store,  {onCreate: false})
        },

        create: rxMethod<EnglishSentenceCreateDto> (
            pipe(
                tap(() => patchState(store, {isLoading: true, isCreated: false})),
                switchMap(body => 
                    service.create(body).pipe(
                        tap(created => {
                            patchState(store, { isLoading: false, onCreate: false, isCreated: true});
                        }),
                        catchError(error => {
                            patchState(store, { isLoading: false, isCreated: false});
                            return EMPTY
                        })

                    )
                )
            )
        )
    }))
)