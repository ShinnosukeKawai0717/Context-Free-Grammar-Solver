/*eslint-disable*/

import {State} from "./state";

export class Column {
    private _index: number
    private readonly _states: State[]
    private _letter: string
    private readonly _unique: Map<State, State>

    constructor(index: number, letter: string) {
        this._index = index
        this._letter = letter
        this._states = []
        this._unique = new Map()
    }

    public get index() {
        return this._index
    }

    public set index(index: number) {
        this._index = index
    }

    public get letter() {
        return this._letter
    }

    public set letter(letter: string) {
        this._letter = letter
    }

    public get states() {
        return this._states
    }

    public add(state: State) {
        if (this._unique.has(state)){
            return this._unique.has(state)
        }
        this._unique.set(state, state)
        this._states.push(state)
        return this._unique.get(state)
    }
}
