/*eslint-disable*/

import {Chart} from "./chart";
import {Grammar2_0} from "./grammar2_0";
import {RHS} from "./rhs";
import {State} from "./state";
import {Sentence} from "./sentence";
import {EarleyOperators} from "./state";

export class EarleyParser {
    private readonly _grammar: Grammar2_0
    private _charts: Chart[]
    private _sentence: Sentence

    constructor(grammar: Grammar2_0, sentence: Sentence) {
        this._grammar = grammar
        this._charts = []
        this._sentence = sentence
    }

    public get grammar() {
        return this._grammar
    }

    public get charts() {
        return this._charts
    }

    public parseSentence() {
        this._charts = new Array<Chart>(this._sentence.words.length+1)
        for (let i = 0; i < this._charts.length; i++) {
            this._charts[i] = new Chart()
        }
        let start1 = ["@", "S"]
        let startRHS = new RHS(start1)
        let state = new State(0, 0,"T", startRHS, EarleyOperators.NONE)
        this.charts[0].addState(state, null)
        for (const chart of this._charts) {
            for (const state of chart.states) {
                let next_term = state.getAfterDot()
                if (state.isDotLast()) {
                    this.completer(state)
                } else {
                    if (this.grammar.isTerminal(next_term!)){
                        this.scanner(state)
                    } else {
                        if (next_term != state.lhs) {
                            this.predictor(state)
                        }
                    }
                }
            }
        }
        let fin = ["S", "@"]
        let finRHS = new RHS(fin)
        let finish = new State(0, this._sentence.words.length, "T", finRHS, EarleyOperators.NONE)
        let last = this.charts[this._sentence.words.length].states[this._charts[this._sentence.words.length].states.length-1]
        if (last != null) return finish.equals(last)
    }

    private predictor(state: State) {
        let lhs = state.getAfterDot();
        let rhs = this._grammar.getRHS(lhs!)
        let j = state.col
        for (let i = 0; i < rhs!.length; i++) {
            let ns = new State(j, j ,lhs!, rhs![i].addDot(), EarleyOperators.PREDICTOR)
            this.charts[j].addState(ns, null)
        }
    }

    private scanner(state: State) {
        let lhs = state.getAfterDot()
        let rhs = this.grammar.getRHS(lhs!)
        let j = state.col
        for (let k = 0; k < rhs!.length; k++) {
            let terms = rhs![k].terms
            if (terms.length == 1 && j < this._sentence.words.length && terms[0].toUpperCase() == this._sentence.words[j].toUpperCase()) {
                let ns = new State(j, j+1, lhs!, rhs![k].addDotLast(), EarleyOperators.SCANNER)
                this.charts[j+1].addState(ns, null)
            }
        }
    }

    private completer(state: State) {
        let lhs = state.lhs
        for (let i = 0; i < this._charts[state.row].states.length; i++) {
            let st = this._charts[state.row].states[i];
            let after = st.getAfterDot()
            if (after != undefined && lhs == after) {
                let ns = new State(st.row, state.col, st.lhs, st.rhs.moveDot(), EarleyOperators.COMPLETER)
                this.charts[state.col].addState(ns, state);
            }
        }
    }
}
