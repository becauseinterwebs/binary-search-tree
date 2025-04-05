/**
 * Example Typescript Binary Search Tree
 */
import BinarySearchTree from './BinarySearchTree';

const bst: BinarySearchTree = new BinarySearchTree();

const nums = [50,40,10,30,100,25,22,13,80,67,97,55,43,32,5];

for (const n of nums) bst.insert(n);

console.log('> Root:', bst.root?.value);

bst.printTree();

var leftDepth = 0;
var left = bst.root;
var nodes = [left?.value];
while (left?.left) { 
    leftDepth++;
    left = left.left;
    nodes.push(left.value);
}
console.log('> Traverse left parent nodes:', nodes.reverse().join(', '));

var rightDepth = 0;
var right = bst.root;
nodes = [right?.value];
while (right?.right) {
    rightDepth++;
    right = right.right;
    nodes.push(right.value);
}
console.log('> Traverse right parent nodes:', nodes.join(', '));

console.log('> Searching for node 22');
var found = bst.find(22);
console.log('> Found node 22, left:',found?.left?.value,'right:', found?.right?.value);

left = bst.leftMost();
console.log('> Leftmost node:', left?.value);

right = bst.rightMost();
console.log('> Rightmost node:', right?.value);

const depth = Math.max(leftDepth, rightDepth);
console.log('Depth:', depth);

bst.printOrder();

