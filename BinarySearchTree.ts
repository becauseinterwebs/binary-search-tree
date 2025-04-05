/**
 * Example Binary Search Tree class in Javascript
 */

interface Node {
    value: number;
    left: Node | null;
    right: Node | null; 
}

class Node {
    constructor (value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
  
export default class BinarySearchTree {

    root: Node | null;

    constructor () {
        this.root = null
    }
    
    insert (value: number) {
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

    find (value: number): Node | undefined {
        if (!this.root) return undefined;
        let current: Node | null = this.root;
        let found: Node | undefined = undefined;
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
        let left: Node | null = this.root;
        while (left?.left) left = left.left;
        return left;
    }

    rightMost () {
        let right: Node | null = this.root;
        while (right?.right) right = right.right;
        return right;
    }

    remove (value: number) {
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
    
    #removeNode (current: Node | null, value: number) {
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
    #kthSmallestNode (node: Node) {
        while (node.left !== null) node = node.left
        return node;
    }

}
