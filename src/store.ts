import { extendObservable, makeAutoObservable } from "mobx";

export type AppStore = {
    json: string;
    setJson: (json: string) => void;
}

export const createAppStore = (): AppStore => {
    const store = makeAutoObservable({
        json: ''
    });

    return extendObservable(store, {
        setJson(json: string) {
            store.json = json;
        }
    });
}