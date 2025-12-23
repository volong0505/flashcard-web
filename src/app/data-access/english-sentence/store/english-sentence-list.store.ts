import { inject, Injectable } from "@angular/core";
import { tapResponse } from '@ngrx/operators';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from "rxjs";
import { EnglishSentenceListItemDto, EnglishSentenceListRequest } from "../dtos";
import { EnglishSentenceService } from "../english-sentence.service";

type EnglishSentenceListState = {
    isLoading: boolean;
    total: number;
    list: EnglishSentenceListItemDto[]
}

const initialState: EnglishSentenceListState = {
    isLoading: false,
    total: 0,
    list: [],
}

@Injectable({ providedIn: 'root' })
export class EnglishSentenceListStore {
    readonly #service = inject(EnglishSentenceService);
    readonly #state = signalState(initialState);

    readonly list = this.#state.list;
    readonly total = this.#state.total;
    readonly isLoading = this.#state.isLoading;

    readonly load = rxMethod<EnglishSentenceListRequest> (
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