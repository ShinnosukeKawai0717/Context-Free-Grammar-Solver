/*eslint-disable*/
export class Sentence {
    private readonly _words: string[]

    constructor(string: string | null) {
        if (string!= null) {
            this._words = string.split(" ")
            return
        }
        this._words = []
    }

    public get words() {
        return this._words
    }
}
