/*eslint-disable*/

import {Column} from "./column";

export class State {
    private readonly _nonTerminal: string
    private readonly _rule: [any]
    private readonly _dot: number
    private readonly _s_col: Column
    private _e_col: Column | null

    constructor(nonTerminal: string, rule: [any], dot: number, s_col: Column, e_col: Column | null = null) {
        this._nonTerminal = nonTerminal
        this._rule = rule
        this._dot = dot
        this._s_col = s_col
        this._e_col = e_col
    }

    public finished() {
        return this._dot >= this._rule.length
    }

    public advance() {
        return new State(this._nonTerminal, this._rule, this._dot+1, this._s_col)
    }

    public at_dot() {
        return this._dot < this._rule.length ? this._rule[this._dot] : null
    }
}
