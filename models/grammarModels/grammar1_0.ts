/*eslint-disable*/

import {TSNode} from "../TernaryTree";

export class Symbol {
    private readonly _val: string
    private readonly _isTerminal: boolean
    constructor(symbol: string) {
        this._val = symbol
        if (symbol == "*" || symbol == "/" || symbol == "-" || symbol == "+") {
            this._isTerminal = true
            return
        }
        this._isTerminal = !(!this.isNumber(symbol) && symbol[0] == symbol[0].toUpperCase());
    }
    public get isTerminal() {
        return this._isTerminal
    }
    public get value(){
        return this._val
    }
    private isNumber(string: string){
        return !isNaN(Number(string)) && !isNaN(parseFloat(string))
    }
}

export class Grammar1_0 {
    private readonly _grammar: Map<Symbol, Symbol[][]>

    public get grammar() {
        return this._grammar
    }
    constructor(arr: string[]) {
        this._grammar = new Map<Symbol, Symbol[][]>();
        arr.forEach((row, index) => {
            let lhs = row.split(" -> ")[0]
            let lhsSymbol = new Symbol(lhs)
            let rule = row.split(" -> ")[1]
            let rhs = rule.split(" | ")
            const twoDArr: Symbol[][] = []
            for (const rh of rhs) {
                let symbols: Symbol[] = []
                rh.split(" ").forEach(value => {
                    let symbol = new Symbol(value)
                    symbols.push(symbol)
                })
                twoDArr.push(symbols)
            }
            this._grammar.set(lhsSymbol, twoDArr)
        })
    }

    private sentence: string = ""

    public getStrings(num: number) {
        let strings = new Set<string>()
        for (let i = 0; i < num; i++) {
            this.generate(new Symbol("S"))
            strings.add(this.sentence)
            this.sentence = ""
        }
        return Array.from(strings).sort((a, b) => a.length - b.length);
    }

    private generate(symbol: Symbol) {
        let value = this.getValue(symbol)
        if (value) {
            let randomIndex = Math.floor(Math.random() * value.length)
            let symbolList = value[randomIndex]
            symbolList.forEach(symbol => {
                if (!symbol.isTerminal) {
                    this.generate(symbol)
                }else {
                    this.sentence += symbol.value + " "
                }
            })
        }
    }

    private getValue(symbol: Symbol) {
        for (const [key, value] of this._grammar) {
            if (symbol.value == key.value) {
                return value
            }
        }
        return null
    }
}