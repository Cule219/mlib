export default class ListNode {
    private val: any;
    private key: string;
    private nextNode: any;

    constructor(value: any, key: string) {
        this.nextNode = null;
        this.key = key;
        this.val = value;
    }

    getNext(): ListNode {
        return this.nextNode
    }

    next(node: ListNode) {
        this.nextNode = node;
    }

    getKey(): string {
        return this.key;
    }

    value(): any {
        return this.val;
    }
}