/*eslint-disable*/
import {RHS} from "./rhs";
import {Sentence} from "./sentence";

export class Grammar {
    private readonly _rules: Map<string, RHS[]>
    private readonly _terminals: string[]
    private readonly _terminalRules: Map<string, string[]>
    private _sentences: Sentence[]
    constructor() {
        this._rules = new Map<string, RHS[]>()
        this._terminals = new Array<string>()
        this._sentences = []
        this._terminalRules = new Map<string, string[]>()
    }

    public get rules() {
        return this._rules
    }

    public get terminals() {
        return this._terminals
    }

    public get terminal_rules() {
        return this._terminalRules
    }

    public get sentences() {
        this._sentences = []
        this.generateStrings()
        return this._sentences
    }

    public getRHS(lhs: string): RHS[] | undefined {
        if (this._rules.has(lhs)) {
            return this._rules.get(lhs)
        }
        return undefined
    }

    private generateStrings() {
        for (let i = 0; i < 10; i++) {
            let sentence = this.generate("S")
            let obj = new Sentence(sentence)
            this._sentences.push(obj)
        }
    }

    private generate(start: string, factor: number = 0.25, count: Map<string[], number> = new Map){
        let sentence = ""

        let weights: number[] = []
        for (const production of this.rules.get(start)!) {
            if (count.has(production.terms)) {
                weights.push(Math.pow(factor, count.get(production.terms)!))
            }else {
                weights.push(1.0)
            }
        }

        let weight = this.weighted_choice(weights)
        let randomProd = this.rules.get(start)![weight]

        let newCount = (count.get(randomProd.terms) ?? 0) + 1
        count.set(randomProd.terms, newCount)

        for (const sym of randomProd.terms) {
            if (this.rules.has(sym)){
                sentence += this.generate(sym, factor, count)
            }else {
                sentence += sym + " "
            }
        }
        newCount = count.get(randomProd.terms)! - 1
        count.set(randomProd.terms, newCount)

        return sentence
    }

    private weighted_choice(weights: number[]): number {
        let sum = 0
        weights.forEach(number =>{
            sum+=number
        })
        let rnd = Math.random() * sum
        for (let i = 0; i < weights.length; i++) {
            rnd -= weights[i]
            if (rnd < 0) {
                return i
            }
        }
        return -1
    }
}

export class CFGrammar extends Grammar {
    constructor(productions: string[]) {
        super();
        for (const production of productions) {
            let lhs = production.split(" -> ")[0]
            // check if lhs is terminal
            if (this.isTerminal(lhs)){
                this.terminals.push(lhs)
                this.terminal_rules.set(lhs, production.split(" -> ")[1].split(" | "))
            }
            if (production.includes("|")){
                let arrOfRhs: RHS[] = []
                production.split(" -> ")[1].split(" | ").forEach(rule => {
                    let nr = rule.split(" ")
                    let rhsObj = new RHS(nr)
                    arrOfRhs.push(rhsObj)
                })
                this.rules.set(lhs, arrOfRhs)
            }else {
                let rhs = production.split(" -> ")[1].split(" ")
                let rhsArr = [new RHS(rhs)]
                this.rules.set(lhs, rhsArr)
            }
        }
    }

    private isTerminal(lhs: string){
        // capitalized and (3 <= |lhs| <= 4 or 1=|lhs|) and not "S"
        return (lhs[0].toUpperCase() == lhs[0]) && (lhs.length == 1 ||(3 <= lhs.length && lhs.length <= 4)) && ("S" != lhs)
    }
}
