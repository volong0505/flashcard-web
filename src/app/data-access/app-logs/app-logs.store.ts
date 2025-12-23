import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

type AppLogsState = {
    isLoading: boolean,
    logs: {
        log: string;
        status: 'success' | 'failed' | 'warning'
    }[]
}

const initialState: AppLogsState = {
    isLoading: false,
    logs: []
}

export const AppLogsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setLoading(value: boolean) {
            patchState(store, { isLoading: value });
        },
        addLog(log: any) {
            patchState(store, { logs: [...store.logs(), log] });

        }
    })))
