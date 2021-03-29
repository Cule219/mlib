import LinkedList from '../linkedlist/linked-list';

class HashTable {
    private size: number;
    private table: Array<LinkedList>;
    constructor(size: number) {
        this.size = size;
        // create LinkedList inside each of the indexes
        this.table = Array.from({ length: size }, (_, i) => new LinkedList());
    }

    hash = (key: string): string => {
        let id: number = 0;

        for(let i = 0; i < key.length; i++) {
            id += key.charCodeAt(i) * 100;
        }
        return String(id % this.size);
    }

    // get value from table
    get (key: string): any {
        const id: string = this.hash(key);
        // get the linked-list from array[index]
        const bucket: LinkedList = this.table[id];
        if(!bucket.empty()) {
            const value: any = bucket.find(key);
            if(value) return value;
        }
        return 'Key does not exist';
    }

    insert (key: string, value: any) {
        const id: string = this.hash(key);
        const bucket: LinkedList = this.table[id];

        bucket.insert(value, key);
    }

    print(): void {
        console.log(this.table)
    }
}