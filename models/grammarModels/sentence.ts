/*eslint-disable*/
export class Sentence {
    private readonly _words: string[]

    constructor(string: string = "") {
        this._words = string.split(" ").filter((value) => {return value != ""})
    }

    public get words() {
        return this._words
    }

    public toString() {
        return this.words.join(" ")
    }
}
