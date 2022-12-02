/*eslint-disable*/
import {State} from "./state";

export class Chart {
    private readonly _states: State[]

    private readonly _id: number

    constructor(id: number) {
        this._states = []
        this._id = id
    }

    public get id(){
        return this._id
    }

    public get states() {
        return this._states
    }

    public chartInfo() {
        console.debug("CHART ID:\t" + this._id)
    }

    public addState(newState: State) {
        if (!this.states.some(state => {return state.equals(newState)})){
            this._states.push(newState)
            return true
        }else {
            return false
        }
    }

    public getState(index: number) {
        if (index < 0 || index >= this._states.length) {
            return null
        }
        return this._states[index]
    }
}
