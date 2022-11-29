/*eslint-disable*/

function arrayEquals(arr1: string[], arr2: string[]) {
    return Array.isArray(arr1) && Array.isArray(arr2) && arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
}

export class RHS {
    private readonly _terms: string[]
    private readonly _hasDot: boolean = false
    private readonly _dot: number = -1
    private static readonly DOT: string = "@"

    constructor(terms: string[]) {
        this._terms = terms
        for (let i = 0; i < this._terms.length; i++) {
            if (this._terms[i] == RHS.DOT){
                this._dot = i
                this._hasDot = true
                break
            }
        }
    }

    public addDot(): RHS {
        const t: string[] = new Array<string>(this._terms.length+1)
        t[0] = RHS.DOT
        for (let i = 1; i < t.length; i++) {
            t[i] = this._terms[i-1]
        }
        return new RHS(t)
    }

    public addDotLast(): RHS{
        const t: string[] = new Array<string>(this._terms.length+1)
        for (let i = 0; i < t.length - 1; i++) {
            t[i] = this._terms[i]
        }
        t[t.length-1] = RHS.DOT
        return new RHS(t)
    }

    public moveDot() {
        const t: string[] = new Array<string>(this._terms.length)
        for (let i = 0; i < this.terms.length; i++) {
            if (this.terms[i] == RHS.DOT) {
                t[i] = this._terms[i+1];
                t[i+1] = RHS.DOT;
                i++;
            } else {
                t[i] = this._terms[i]
            }
        }
        return new RHS(t)
    }

    public get terms() {
        return this._terms
    }

    public get hasDot() {
        return this._hasDot
    }

    public get dotIndex() {
        return this._dot
    }

    public isDotLast() {
        if (this._hasDot) return this._dot == this._terms.length-1
        return false
    }

    public isDotFirst() {
        if (this._hasDot) return this._dot == 0
        return false
    }

    public getPriorToDot() {
        if (this._hasDot && this._dot > 0) {
            return this._terms[this._dot-1]
        }
        return ""
    }

    public getAfterDot() {
        if (this._hasDot && this._dot < this._terms.length-1) {
            return this._terms[this._dot+1]
        }
        return undefined
    }

    public equals(object: RHS) {
        return arrayEquals(this._terms, object.terms) && this._dot == object.dotIndex && this._hasDot == object.hasDot;
    }
}
