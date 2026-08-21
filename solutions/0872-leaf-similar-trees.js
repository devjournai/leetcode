/**
 * Leaf Similar Trees
 * Intuition: Two trees are leaf-similar iff their left-to-right leaf sequences match. Collect leaves of `root1` with recursion and of `root2` with an explicit stack that still visits left before right.
 * Approach: 1. `collectRecursiveLeaves` DFS: skip null; if no children, push `val`; else recurse left then right into `firstLeafValues`. 2. Iterative DFS on `root2`: pop a node; if leaf, push to `secondLeafValues`; else push right then left so left is processed first. 3. Return false if lengths differ or any index mismatches; else true.
 * Dry Run: root1 leaves 6,7,4,9,8 and root2 the same sequence.
 *   - Recursion fills [6,7,4,9,8]; stack walk fills [6,7,4,9,8]; lengths and values match → true.
 * Time Complexity: O(N1 + N2)
 * Space Complexity: O(N1 + N2)
 */
var leafSimilar = function (root1, root2) {
  let firstLeafValues = [];

  function collectRecursiveLeaves(currentNodeA, leafListA) {
    if (!currentNodeA) {
      return;
    }
    if (!currentNodeA.left && !currentNodeA.right) {
      leafListA.push(currentNodeA.val);
      return;
    }
    collectRecursiveLeaves(currentNodeA.left, leafListA);
    collectRecursiveLeaves(currentNodeA.right, leafListA);
  }

  collectRecursiveLeaves(root1, firstLeafValues);

  let secondLeafValues = [];
  let nodeStack = [];
  if (root2) {
    nodeStack.push(root2);
  }

  while (nodeStack.length > 0) {
    let currentIterativeNode = nodeStack.pop();

    if (!currentIterativeNode.left && !currentIterativeNode.right) {
      secondLeafValues.push(currentIterativeNode.val);
    } else {
      if (currentIterativeNode.right) {
        nodeStack.push(currentIterativeNode.right);
      }
      if (currentIterativeNode.left) {
        nodeStack.push(currentIterativeNode.left);
      }
    }
  }

  if (firstLeafValues.length !== secondLeafValues.length) {
    return false;
  }

  for (let leafIndex = 0; leafIndex < firstLeafValues.length; leafIndex++) {
    if (firstLeafValues[leafIndex] !== secondLeafValues[leafIndex]) {
      return false;
    }
  }

  return true;
};
