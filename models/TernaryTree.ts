/*eslint-disable*/
import {Symbol} from "./grammarModels/grammar1_0";
export class TSNode {
    data: Symbol
    public left: TSNode | null
    public middle: TSNode | null
    public right: TSNode | null

    constructor(data: Symbol) {
        this.data = data
        this.left = null
        this.middle = null
        this.right = null
    }
}


export class TernaryTree {
    private readonly _root: TSNode

    constructor(root: TSNode) {
        this._root = root
    }

    public get root() {
        return this._root
    }

    public insert(symbols: string[]) {
        if (this.isLeaf(this._root)){
            this.assign(this._root, symbols)
        }else {
            this.insertHelper(this._root, symbols)
        }
    }

    public preorderTraverse() {
        this.traverseHelper(this._root)
    }

    private traverseHelper(root: TSNode) {
        let current = root
        if (current == null) return
        if (current.data.isTerminal) console.log(current.data.value)
        this.traverseHelper(current.left!)
        this.traverseHelper(current.middle!)
        this.traverseHelper(current.right!)
    }

    private getNewRoot(root: TSNode){
        let current = root
        if (current == null) {
            return
        }
        let storage: TSNode[] = []
        let nodes: TSNode[] = []
        storage.push(current)
        while (storage.length !== 0) {
            let curr = storage.pop()
            nodes.push(curr!)
            if (curr!.right != null) {
                storage.push(curr!.right)
            }
            if (curr!.middle != null) {
                storage.push(curr!.middle)
            }
            if (curr!.left != null) {
                storage.push(curr!.left)
            }
        }

        let terminalIndex = 0
        for (let i = 0; i < nodes.length; i++) {
            if (this.isLeaf(nodes[i]) && nodes[i].data.isTerminal) {
                terminalIndex = i
            }
        }
        return nodes[terminalIndex+1]
    }

    private insertHelper(root: TSNode, symbols: string[]) {
        if (this.isLeaf(root) && !root.data.isTerminal) {
            this.assign(root, symbols)
        } else {
            if (root.left != null) {
                if (!root.left.data.isTerminal) {
                    this.insertHelper(root.left, symbols)
                } else if (root.middle != null) {
                    if (!root.middle.data.isTerminal) {
                        this.insertHelper(root.middle, symbols)
                    } else if (root.right != null) {
                        if (!root.right.data.isTerminal) {
                            this.insertHelper(root.right, symbols)
                        }
                    }
                } else {
                    const newRoot = this.getNewRoot(this._root)
                    if (newRoot) this.insertHelper(newRoot, symbols)
                    else {
                    }
                }
            }
        }
    }

    private assign(root: TSNode, symbols: string[]) {
        if (symbols.length == 1) {
            root.left = new TSNode(new Symbol(symbols[0]))
        }else if (symbols.length == 2) {
            root.left = new TSNode(new Symbol(symbols[0]))
            root.right = new TSNode(new Symbol(symbols[1]))
        }else {
            root.left = new TSNode(new Symbol(symbols[0]))
            root.middle = new TSNode(new Symbol(symbols[1]))
            root.right = new TSNode(new Symbol(symbols[2]))
        }
    }

    private isLeaf(root: TSNode) {
        return root.left == null && root.right == null && root.middle == null
    }
}
