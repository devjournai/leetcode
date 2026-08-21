/**
 * Kth Smallest Element In A Bst
 * Intuition: Inorder traversal of a BST yields sorted values. An iterative inorder with a stack can stop after k visits.
 * Approach: 1. Walk left, pushing onto a stack. 2. Pop, decrement remainingCount. 3. When remainingCount hits 0, return that node's value. 4. Then continue from the popped node's right child.
 * Dry Run: BST [3,1,4,null,2], k = 1.
 *   - Push 3, then 1. Pop 1, remainingCount = 0 → return 1.
 * Time Complexity: O(H + k)
 * Space Complexity: O(H)
 */
var kthSmallest = function (root, k) {
  let traversalStack = [];
  let explorationPointer = root;
  let remainingCount = k;

  while (explorationPointer !== null || traversalStack.length > 0) {
    while (explorationPointer !== null) {
      traversalStack.push(explorationPointer);
      explorationPointer = explorationPointer.left;
    }

    let processedNode = traversalStack.pop();
    remainingCount--;

    if (remainingCount === 0) {
      return processedNode.val;
    }

    explorationPointer = processedNode.right;
  }
};
