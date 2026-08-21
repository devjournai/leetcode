/**
 * Delete Node In A Bst
 * Intuition: Recurse to the key. Zero/one child: splice that child in. Two children: copy the inorder successor (min of the right subtree) then delete that successor from the right.
 * Approach: 1. Null → null. 2. key < val → recurse left; key > val → recurse right. 3. Else: no left return right; no right return left. 4. Else walk right subtree to min, copy `val`, `deleteNode` that value on the right. 5. Return root.
 * Dry Run: 5/3,6/2,4 delete 3. Two children; successor 4; node becomes 4, right of 4 deleted. Tree 5/4,6/2.
 * Time Complexity: O(H)
 * Space Complexity: O(H)
 */
var deleteNode = function (root, key) {
  if (!root) {
    return null;
  }

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    } else {
      const findMinimumNodeInSubtree = (subtreeRoot) => {
        let currentNodeIterator = subtreeRoot;
        while (currentNodeIterator.left !== null) {
          currentNodeIterator = currentNodeIterator.left;
        }
        return currentNodeIterator;
      };

      let inOrderSuccessor = findMinimumNodeInSubtree(root.right);
      root.val = inOrderSuccessor.val;
      root.right = deleteNode(root.right, inOrderSuccessor.val);
    }
  }

  return root;
};
