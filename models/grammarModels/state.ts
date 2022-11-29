/*eslint-disable*/

import {RHS} from "./rhs";
import {EarleyParser} from "./parser";

export enum EarleyOperators {
    SCANNER,
    PREDICTOR,
    COMPLETER,
    NONE
}

export class State {
    private readonly _lhs: string
    private readonly _row: number
    private readonly _col: number
    private readonly _rhs: RHS
    private readonly _backwardPointer: State[]
    private readonly _addedBy: EarleyOperators

    constructor(i: number, j: number, lhs: string, rhs: RHS, addedBy: EarleyOperators) {
        this._lhs = lhs
        this._rhs = rhs
        this._row = i
        this._col = j
        this._addedBy= addedBy
        this._backwardPointer = []
    }

    public get lhs() {
        return this._lhs
    }

    public get rhs() {
        return this._rhs
    }

    public get row() {
        return this._row
    }

    public get col() {
        return this._col
    }

    public get addedBy() {
        return this._addedBy
    }

    public get backwardPointer() {
        return this._backwardPointer
    }

    public addBackPointer(state: State) {
        this.backwardPointer.push(state)
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

    public equals(object: State) {
        return this.lhs === object.lhs && this._row === object.row && this.col === object.col && this._rhs.equals(object.rhs)
    }
}
