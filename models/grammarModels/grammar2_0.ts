/*eslint-disable*/
import {RHS} from "./rhs";
import {Sentence} from "./sentence";

export class Grammar2_0 {
    private readonly _rules: Map<string, RHS[]>
    private readonly _terminals: string[]

    constructor() {
        this._rules = new Map<string, RHS[]>()
        this._terminals = new Array<string>()
    }

    public get rules() {
        return this._rules
    }

    public get terminals() {
        return this._terminals
    }

    public getRHS(lhs: string): RHS[] | undefined {
        let rules = undefined
        if (this._rules.has(lhs)) {
            rules = this._rules.get(lhs)
        }
        return rules
    }

    public async generateStrings() {
        let result: Sentence[] = []
        // for (let i = 0; i < 5; i++){
            this.generate(result)

        return result
    }

    private string: string = ""

    private generate(list: Sentence[]){
        let result: string = ""
        this.helper("S")
        list.push(new Sentence(result))
    }

    private helper(val: string) {
        if (this.rules.has(val)) {
            let rhs = this.rules.get(val)!
            let randomIndex = Math.floor(Math.random() * rhs.length)
            let term = rhs[randomIndex]

            term.terms.forEach((string) => {
                if (string != "@"){
                    if (string[0] === string[0].toUpperCase()){
                        this.helper(string)
                    }else {
                        if (!this.string.includes(string)) {
                            this.string += string + " "
                            console.debug(this.string)
                        }
                    }
                }
            })
        }
    }

    public isTerminal(lhs: string) {
        return this._terminals.includes(lhs)
    }
}

export class CFGrammar extends Grammar2_0 {
    constructor() {
        super();
        this.initialize()
    }

    private initialize() {
        this.initRules()
        this.initPOS()
    }

    private initRules() {
        const s1 = ["NP", "VP"]
        const sRHS = [new RHS(s1)]
        this.rules.set("S", sRHS)

        let np1 = ["NP","PP"];
        let np2 = ["N"];
        let npRHS = [new RHS(np1), new RHS(np2)];
        this.rules.set("NP", npRHS)

        let vp1 = ["V","NP"];
        let vp2 = ["VP", "PP"];
        let vpRHS = [new RHS(vp1), new RHS(vp2)];
        this.rules.set("VP", vpRHS);

        let pp1 = ["P","NP"];
        let ppRHS = [new RHS(pp1)];
        this.rules.set("PP", ppRHS);

        let verb = ["saw"];
        let verbRHS = [new RHS(verb)];
        this.rules.set("V", verbRHS);

        let prep = ["with"];
        let prepRHS = [new RHS(prep)];
        this.rules.set("P", prepRHS);

        let noun1 = ["astronomers"];
        let noun2 = ["ears"];
        let noun3 = ["stars"];
        let noun4 = ["telescopes"];
        let nounRHS = [new RHS(noun1), new RHS(noun2), new RHS(noun3), new RHS(noun4)];
        this.rules.set("N", nounRHS);
    }

    private initPOS() {
        this.terminals.push("N")
        this.terminals.push("V")
        this.terminals.push("P")
    }
}
