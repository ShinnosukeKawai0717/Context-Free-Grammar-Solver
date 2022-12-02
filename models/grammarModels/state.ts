/*eslint-disable*/

import {RHS} from "./rhs";

export enum EarleyOperators {
    SCANNER = "Scanner",
    PREDICTOR = "Predictor",
    COMPLETER = "Completer",
    NONE = "Starter"
}


export class State {
    private readonly _lhs: string
    private readonly _start: number
    private readonly _end: number
    private readonly _rhs: RHS
    private readonly _back_pointers: State[]
    private readonly _id: number
    private readonly _addedBy: EarleyOperators

    constructor(i: number, j: number, lhs: string, rhs: RHS, id: number, backPointer: State[], addedBy: EarleyOperators) {
        this._id = id
        this._lhs = lhs
        this._rhs = rhs
        this._start = i
        this._end = j
        this._back_pointers = backPointer
        this._addedBy= addedBy
    }

    public stateInfo() {
        console.info("ID: "+ this._id + "\t(" + this._start + ", " + this._end + ")\t" + this._lhs + " => " + this._rhs.terms + "\t\t" + this._addedBy + "\t" + this.backPointersInSting())
    }

    public get lhs() {
        return this._lhs
    }

    public get rhs() {
        return this._rhs
    }

    public get start() {
        return this._start
    }

    public get end() {
        return this._end
    }

    public get id() {
        return this._id
    }

    public get addedBy() {
        return this._addedBy
    }

    public get back_pointers() {
        return this._back_pointers
    }

    public backPointersInSting(){
        let pointer = ""
        if (this._back_pointers.length == 0) {
            return "[]"
        }
        this._back_pointers.forEach((state) => {
            pointer += state.id + ", "
        })
        pointer = "[" + pointer.slice(0, pointer.length-2) + "]"
        return pointer
    }

    public position() {
        return "[" + this.start + ", " + this.end + "]"
    }

    public getPriorToDot() {
        return this._rhs.getPriorToDot()
    }

    public getAfterDot() {
        return this._rhs.getAfterDot()
    }

    public isDotLast() {
        return this._rhs.isDotLast()
    }

    public equals(other: State) {
        return this.lhs === other.lhs && this._rhs.equals(other.rhs) && this._start === other.start && this.end === other.end
    }
}
