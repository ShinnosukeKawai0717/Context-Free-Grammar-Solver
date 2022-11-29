/*eslint-disable*/
import {State} from "./state";

export class Chart {
    private readonly _states: State[]

    constructor() {
        this._states = []
    }

    public get states() {
        return this._states
    }

    public addState(newState: State, source: State | null) {
        if (!this.states.some((state) => {return state.equals(newState)})){
            if (source) newState.addBackPointer(source)
            this._states.push(newState)
        }
    }

    public getState(index: number) {
        if (index < 0 || index >= this._states.length) {
            return null
        }
        return this._states[index]
    }
}
