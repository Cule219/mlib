class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// FIFO
class Queue {
    constructor() {
        this.front = null;
        this.back = null;
    }

    isEmpty() {
        return !this.front;
    }

    enqueue(value) {
        // create a new Node with value
        const node = new Node(value);
        // check if queue is empty
        if(this.isEmpty()) {
            // point front and back to the new node
            this.front = this.back = node;
        } else {
            // else push node to the back of the queue by pointing the last node to the newly created node
            this.back.next = node;
            // move back pointer to the newly created node
            this.back = node;
        }
        // print status of the queue
        this.print();
    }

    dequeue(){
        // check if the queue is empty
        if(this.isEmpty()) {
            console.log('Queue is empty');
        } else {
            // get the current front node
            const current = this.front;
            // move this front to point to the next node of the current front
            this.front = current.next;
            // check if the front is empty and set back to empty
            if(this.isEmpty()) {
                this.back = null;
            }
            // return front
            console.log(current);
            return current;
        }

    }

    print() {
        // If queue is empty
        if(this.isEmpty()) console.log('Queue is empty');
        // else iterate over each element and print(on the same line, hence an array)
        const arr = [];
        let current = this.front;
        while(current) {
            arr.push(current.value);
            current = current.next;
        }
        // print statement
        console.log(`The queue looks like: ${arr}`);
    }
}

module.exports = { Queue, Node };