import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { EnglishStructureService } from "../english-structure-service";

type EnglishStructureCreateState = {
    onCreate: boolean;
    isLoading: boolean;
    isCreated: boolean
}

const initialState: EnglishStructureCreateState = {
    onCreate: false,
    isLoading: false,
    isCreated: false
}

export const EnglishStructureCreateStore = signalStore({ providedIn: 'root'},
    withState(initialState),
    withMethods((store, service = inject(EnglishStructureService)) => ({
        openDrawer(): void {
            patchState(store, { onCreate: true})
        },
        closeDrawer(): void {
            patchState(store, { onCreate: false})
        }
    }))
)