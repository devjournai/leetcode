/**
 * Kth Smallest Element In A Bst
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
