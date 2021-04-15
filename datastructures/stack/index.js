const { Stack } = require('./Stack');

const stack = new Stack();

stack.push(100);
stack.push(200);
stack.push(300);
stack.pop();
stack.pop();
stack.pop();
stack.pop();

stack.print();