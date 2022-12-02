/*eslint-disable*/

export class Label {
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
