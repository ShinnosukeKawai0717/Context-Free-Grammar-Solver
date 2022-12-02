/*eslint-disable*/

import {Chart} from "./chart";
import {Grammar} from "./grammar";
import {RHS} from "./rhs";
import {EarleyOperators, State, StaticStorage} from "./state";
import {Sentence} from "./sentence";

export class EarleyParser {
    private readonly _grammar: Grammar
    private readonly _charts: Chart[]
    private _sentence: Sentence
    private _curr_id: number

    constructor(grammar: Grammar, sentence: Sentence) {
        this._grammar = grammar
        this._sentence = sentence
        this._curr_id = 0
        this._charts = new Array<Chart>(sentence.words.length+1)
        for (let i = 0; i < this._charts.length; i++) {
            this._charts[i] = new Chart(i)
        }
    }

    private get_new_id() {
        this._curr_id += 1
        return this._curr_id - 1
    }

    private enqueue(state: State, index: number) {
        let result = this._charts[index].addState(state)
        if (!result) {
            this._curr_id -= 1
        }
    }

    public get grammar() {
        return this._grammar
    }

    public get charts() {
        return this._charts
    }

    public async parseSentence() {
        let start1 = ["@", "S"]
        let startRHS = new RHS(start1)
        let state = new State(0, 0,"T", startRHS, this.get_new_id(),[], EarleyOperators.NONE)
        this._charts[0].addState(state)
        for await (const chart of this._charts) {
            for (const state of chart.states) {
                let next_term = state.getAfterDot()
                if (state.isDotLast()) {
                    this.completer(state)
                } else {
                    if (this.grammar.terminal_rules.has(next_term!)){
                        this.scanner(state)
                    } else {
                        this.predictor(state)
                    }
                }
            }
        }
        return await this.derivationTrees()
    }


    public async derivationTrees(){
        let parseTree: State[][] = []
        for  (const state of this.charts[this._sentence.words.length].states) {
            if (state.lhs == "S" && state.start == 0 && state.end == this._sentence.words.length && state.isDotLast()) {
                let states = await this.helper(state, [])
                parseTree.push(states)
            }
        }

        return parseTree
    }

    private async helper(state: State, arrState: State[]): Promise<State[]> {
        arrState.push(state)
        for (const backPointer of state.back_pointers) {
            if (backPointer.back_pointers.length >= 1) {
                arrState.concat(await this.helper(backPointer, arrState))
            } else {
                arrState.push(backPointer)
            }
        }
        return arrState
    }

    private predictor(state: State) {
        let lhs = state.getAfterDot();
        let rhs = this._grammar.getRHS(lhs!)
        let j = state.end
        for (let i = 0; i < rhs!.length; i++) {
            let newState = new State(j, j ,lhs!, rhs![i].addDot(), this.get_new_id(),[], EarleyOperators.PREDICTOR)
            this.enqueue(newState, j)
        }
    }

    private scanner(state: State) {
        let next = state.getAfterDot()
        let rhs = this.grammar.getRHS(next!)
        let j = state.end
        for (let k = 0; k < rhs!.length; k++) {
            let terms = rhs![k].terms
            if (terms.length == 1 && j < this._sentence.words.length && terms[0].toUpperCase() == this._sentence.words[j].toUpperCase()) {
                let newState = new State(j, j+1, next!, rhs![k].addDotLast(), this.get_new_id(), [], EarleyOperators.SCANNER)
                this.enqueue(newState, j+1)
            }
        }
    }

    private completer(state: State) {
        let lhs = state.lhs
        for (const st of this.charts[state.start].states) {
            let after = st.getAfterDot()
            if (after != undefined && lhs == after) {
                let newState = new State(st.start, state.end, st.lhs, st.rhs.moveDot(), this.get_new_id(), st.back_pointers.concat(state), EarleyOperators.COMPLETER)

                if (newState.lhs == "S" && newState.isDotLast() &&
                    newState.start == 0 && newState.end == this._sentence.words.length && !this.seen(newState.back_pointers)){
                    this.charts[state.end].states.push(newState)
                    return
                }
                this.enqueue(newState, state.end)
            }
        }
    }

    private seen(ns: State[]){
        this.charts[this._sentence.words.length].states.forEach(state => {
            if (state.back_pointers == ns) {
                return true
            }
        })
        return false
    }
}
