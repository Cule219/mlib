// LIFO
class Stack {
    constructor() {
        // typicaly stacks size is defined at creating, but JS
        // in array ds stack we would have to check if stack is full also, but JS
        this.items = [];
        this.count = 0;
    }

    push(element) {
        // add element to the top of the stack
        this.items[this.count] = element;
        // inc the stack count
        this.count++;
        console.log(`${element} added to postion ${this.count - 1}`);
        return this.count - 1;
    }

    pop(){
        // here we do magic, also arrays have pop so that
        // check if stack is empty
        if(!this.count) return undefined;
        // dec the count
        this.count--;
        console.log(`${this.items[this.count]} removed from position ${this.count}`)
        return this.items.pop();
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

    peek() {
        // check what is on top of the stack
        console.log(`Top level element is ${this.items[this.count - 1]}`);
        return this.items[this.count - 1];
    }

    isEmpty() {
        return !this.count;
    }

    checkSize() {
        return this.count;
    }

    // Print elements in stack
    print() {
        console.log(this.items);
    }

    clear() {
        // reset the stack
        this.items = [];
        this.count = 0;
    }
}

module.exports = { Stack };