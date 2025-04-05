from BinarySearchTree import BinarySearchTree

def main():
    bst = BinarySearchTree()

    nums = [50, 40, 10, 30, 100, 25, 22, 13, 80, 67, 97, 55, 43, 32, 5]

    for n in nums:
        bst.insert(n)

    print('> Root:', bst.root.value if bst.root else None)

    left_depth = 0
    left = bst.root
    nodes = [left.value] if left else []

    while left and left.left:
        left_depth += 1
        left = left.left
        nodes.append(left.value)

    print('> Traverse left parent nodes:', ', '.join(map(str, reversed(nodes))))

    right_depth = 0
    right = bst.root
    nodes = [right.value] if right else []

    while right and right.right:
        right_depth += 1
        right = right.right
        nodes.append(right.value)

    print('> Traverse right parent nodes:', ', '.join(map(str, nodes)))

    print('> Searching for node 22')
    found = bst.find(22)
    print('> Found node 22, left:',
          found.left.value if found and found.left else None,
          'right:',
          found.right.value if found and found.right else None)

    left = bst.left_most()
    print('> Leftmost node:', left.value if left else None)

    right = bst.right_most()
    print('> Rightmost node:', right.value if right else None)

    depth = max(left_depth, right_depth)
    print('Depth:', depth)

    bst.print_order(bst.root)

    bst.print_tree(bst.root)


if __name__ == "__main__":
    main()