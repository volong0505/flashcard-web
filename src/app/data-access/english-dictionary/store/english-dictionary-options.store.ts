import { inject, Injectable } from "@angular/core";
import { tapResponse } from '@ngrx/operators';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from "rxjs";
import { EnglishDictionaryGetOptionsItemDto, EnglishDictionaryGetOptionsRequest } from "../dtos/get-options";
import { EnglishDictionaryService } from "../english-dictionary.service";

type EnglishDictionaryOptionsState = {
    isLoading: boolean;
    options: EnglishDictionaryGetOptionsItemDto[]
}

const initialState: EnglishDictionaryOptionsState = {
    isLoading: false,
    options: []
}

@Injectable({ providedIn: 'root' })
export class EnglishDictionaryOptionsStore {
    readonly #service = inject(EnglishDictionaryService);
    readonly #state = signalState(initialState);

    readonly options = this.#state.options;
    readonly isLoading = this.#state.isLoading;

    readonly getOptions = rxMethod<EnglishDictionaryGetOptionsRequest> (
        pipe(
            tap(() => patchState(this.#state, { isLoading: true})),
            switchMap((query) => {
                return this.#service.getOptions(query).pipe(
                    tapResponse({
                        next: ({options}) => patchState(this.#state, { options}),
                        error: console.error,
                        finalize: () => patchState(this.#state, { isLoading: false})
                    })
                )
            })
        )
    )
}