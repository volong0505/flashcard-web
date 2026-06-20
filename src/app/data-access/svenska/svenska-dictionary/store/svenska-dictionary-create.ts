import { inject, Injectable } from "@angular/core";
import { patchState, signalState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { SvenskaDictionaryCreateDto } from "../dtos";
import { catchError, EMPTY, pipe, switchMap, tap } from "rxjs";
import { SvenskaDictionaryService } from "../service";

type SvenskaDictionaryCreateState = {
    onCreate: boolean;
    isLoading: boolean;
    isCreated: boolean;
}

const initialState: SvenskaDictionaryCreateState = {
    isLoading: false,
    onCreate: false,
    isCreated: false
}

export const SvenskaDictionaryCreateStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, service = inject(SvenskaDictionaryService)) => ({
        openDrawer(): void {
            patchState(store, {onCreate: true})
        },
        closeDrawer(): void {
            patchState(store,  {onCreate: false})
        },

        create: rxMethod<SvenskaDictionaryCreateDto> (
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