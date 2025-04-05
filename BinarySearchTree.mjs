/**
 * Example Binary Search Tree class in Javascript
 */

class Node {
    constructor (value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
  
export default class BinarySearchTree {

    constructor () {
        this.root = null
    }
    
    insert (value) {
        var newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (current) {
            if (value === current.value) return undefined;
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                } 
                current = current.right;
            }
        }
    }

    find (value) {
        if (!this.root) return false;
        let current = this.root;
        let found = undefined;
        while (current && !found) {
            if (value < current.value) {
                current = current.left
            } else if (value > current.value) {
                current = current.right
            } else {
                found = current
            } 
        }
        return found;
    }

    leftMost () {
        var left = this.root;
        while (left.left) left = left.left;
        return left;
    }

    rightMost () {
        var right = this.root;
        while (right.right) right = right.right;
        return right;
    }

    remove (value) {
        this.root = this.#removeNode(this.root, value);
    }

    // Print the tree in sorted order
    printOrder (node = this.root) {
        if (node !== null) {
            this.printOrder(node.left);
            console.log(node.value);
            this.printOrder(node.right);
        }
    }

    // function to visualze search tree in the console
    printTree (node = this.root, level = 0, prefix = 'Root: ') {
        if (node === null) return;
        console.log('  '.repeat(level) + prefix + node.value);
        this.printTree(node.left, level + 1, 'L--- ');
        this.printTree(node.right, level + 1, 'R--- ');
    }
    
    #removeNode (current, value) {
        if (current === null) return current;
        // when value is the same as current's value, this is the node to be deleted
        if (value === current.value) {
            // for case 1 and 2, node without child or with one child
            if (current.left === null && current.right === null) {
                return null;
            } else if (current.left === null) {
                return current.right;
            } else if (current.right === null) {
                return current.left;
            } else {
                /// node with two children, get the inorder successor, 
                //smallest in the right subtree
                let tempNode = this.#kthSmallestNode(current.right);
                 current.value = tempNode.value;
                /// delete the inorder successor
                current.right = this.#removeNode(current.right, tempNode.value);
                return current;
            }

        // traverse the tree
        } else if (value < current.value) {
            current.left = this.#removeNode(current.left, value);
            return current;
        } else {
            current.right = this.#removeNode(current.right, value);
            return current;
        }
    }
    
    // helper function to find the smallest node
    #kthSmallestNode (node) {
        while (node.left !== null) node = node.left
        return node;
    }

}
