import { inject, Injectable } from "@angular/core";
import { patchState, signalState, signalStore, withMethods, withState } from "@ngrx/signals";
import { EnglishDictionaryService } from "../english-dictionary.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { EnglishDictionaryCreateDto } from "../dtos";
import { catchError, EMPTY, pipe, switchMap, tap } from "rxjs";

type EnglishDictionaryCreateState = {
    onCreate: boolean;
    isLoading: boolean;
    isCreated: boolean;
}

const initialState: EnglishDictionaryCreateState = {
    isLoading: false,
    onCreate: false,
    isCreated: false
}

export const EnglishDictionaryCreateStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, service = inject(EnglishDictionaryService)) => ({
        openDrawer(): void {
            patchState(store, {onCreate: true})
        },
        closeDrawer(): void {
            patchState(store,  {onCreate: false})
        },

        create: rxMethod<EnglishDictionaryCreateDto> (
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