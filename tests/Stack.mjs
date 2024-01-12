// * Testing of Stack, Queue and NTreeNode data structures

import { Queue, Stack, NTreeNode } from "../src/modules/exports/algorithms.mjs"

// ! Either generalize to an array of templates for which to test, or pick a 'parentclass';
const qc = Queue()
const sc = Stack()
const ntnc = NTreeNode()

// ! add values for those (maybe, extend the tests instances list... as all this is simply renaming mostly, little necessity for that...);
const queue = qc.class()
const stack = sc.class()
const ntreenode = ntnc.class()

// ! Add values for this (namely, the '.enqueue' method)...
console.log(queue.front())
queue.enqueue()
console.log(queue.front())
queue.enqueue()
console.log(queue.front())
queue.enqueue()
console.log(queue.front())

queue.dequeue()
console.log(queue.front())
queue.dequeue()
console.log(queue.front())
queue.dequeue()
console.log(queue.front())

console.log(queue.copy() === queue)
console.log(queue.copy().genarr.array)

// ! Add values for this, pray...
console.log(stack.peek())
stack.push()
console.log(stack.peek())
stack.push()
console.log(stack.peek())
stack.push()
console.log(stack.peek())

console.log(stack.peek())
stack.pop()
console.log(stack.peek())
stack.pop()
console.log(stack.peek())
stack.pop()
console.log(stack.peek())

console.log(stack.copy() === stack)
console.log(stack.copy().genarr.array)

// ! [ABOUT NTREENODE tests] Add arguments. Generalize - check for different values of 'n' what this ought to look like... [and, generalize the number of cases of 'insert' for each iteration - this is too little...]; 
console.log(ntreenode.insert())
console.log(ntreenode.insert())
console.log(ntreenode.insert())
console.log(ntreenode.insert())

console.log(ntreenode.pushback())
console.log(ntreenode.pushback())
console.log(ntreenode.pushback())
console.log(ntreenode.pushback())

console.log(ntreenode.pushfront())
console.log(ntreenode.pushfront())
console.log(ntreenode.pushfront())
console.log(ntreenode.pushfront())
