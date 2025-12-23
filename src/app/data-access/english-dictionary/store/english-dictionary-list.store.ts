import { inject, Injectable } from "@angular/core";
import { tapResponse } from '@ngrx/operators';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from "rxjs";
import { EnglishDictionaryListItemDto, EnglishDictionaryListRequest } from "../dtos";
import { EnglishDictionaryService } from "../english-dictionary.service";

type EnglishDictionaryListState = {
    isLoading: boolean;
    total: number;
    list: EnglishDictionaryListItemDto[]
}

const initialState: EnglishDictionaryListState = {
    isLoading: false,
    total: 0,
    list: [],
}

@Injectable({ providedIn: 'root' })
export class EnglishDictionaryListStore {
    readonly #service = inject(EnglishDictionaryService);
    readonly #state = signalState(initialState);

    readonly list = this.#state.list;
    readonly total = this.#state.total;
    readonly isLoading = this.#state.isLoading;

    readonly load = rxMethod<EnglishDictionaryListRequest> (
        pipe(
            tap(() => patchState(this.#state, { isLoading: true})),
            switchMap((query) => {
                return this.#service.getAll(query).pipe(
                    tapResponse({
                        next: ({list, total}) => patchState(this.#state, { list, total}),
                        error: console.error,
                        finalize: () => patchState(this.#state, { isLoading: false})
                    })
                )
            })
        )
    )
}