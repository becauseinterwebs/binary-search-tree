class Node:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value: int):
        new_node = Node(value)
        if self.root is None:
            self.root = new_node
            return self
        current = self.root
        while current:
            if value == current.value:
                return None  # duplicate value
            if value < current.value:
                if current.left is None:
                    current.left = new_node
                    return self
                current = current.left
            else:
                if current.right is None:
                    current.right = new_node
                    return self
                current = current.right

    def find(self, value: int):
        if self.root is None:
            return None
        current = self.root
        found = None
        while current and not found:
            if value < current.value:
                current = current.left
            elif value > current.value:
                current = current.right
            else:
                found = current
        return found

    def left_most(self):
        left = self.root
        while left and left.left:
            left = left.left
        return left

    def right_most(self):
        right = self.root
        while right and right.right:
            right = right.right
        return right

    def remove(self, value: int):
        self.root = self._remove_node(self.root, value)

    def _remove_node(self, current: Node, value: int):
        if current is None:
            return None

        if value == current.value:
            if current.left is None and current.right is None:
                return None
            elif current.left is None:
                return current.right
            elif current.right is None:
                return current.left
            else:
                temp_node = self._kth_smallest_node(current.right)
                current.value = temp_node.value
                current.right = self._remove_node(current.right, temp_node.value)
                return current
        elif value < current.value:
            current.left = self._remove_node(current.left, value)
            return current
        else:
            current.right = self._remove_node(current.right, value)
            return current

    def _kth_smallest_node(self, node: Node):
        while node.left is not None:
            node = node.left
        return node

    def print_order(self, node):
        if node is not None:
            self.print_order(node.left)
            print(node.value)
            self.print_order(node.right)

    def print_tree(self, node, level=0, prefix='Root: '):
        if node is None:
            return
        print('  ' * level + prefix + str(node.value))
        self.print_tree(node.left, level + 1, 'L--- ')
        self.print_tree(node.right, level + 1, 'R--- ')