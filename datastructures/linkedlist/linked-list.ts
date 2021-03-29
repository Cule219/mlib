import ListNode from './list-node';

export default class LinkedList {
    private head: any = null;

    empty (): boolean {
        if (this.head) return false;
        return true;
    }

    last (): ListNode {
        let dummy: ListNode = this.head;
        while(dummy.getNext()) {
            dummy = dummy.getNext();
        }
        return dummy;
    }

    find (key: string): any {
        let dummy: ListNode = this.head;
        while(dummy.getNext()) {
            dummy = dummy.getNext();
        }
        return dummy;
    }

    insert (value: any, key: string) {
        var node: ListNode = new ListNode(value, key);
        if(!this.head) this.head = node;
        else this.last().next(node);
    }

    print (): void {
        let dummy: ListNode = this.head;
        while(dummy.getNext()) {
            console.log(dummy.value() + ' ');
            dummy = dummy.getNext();
        }
    }
}
