/**
 * Cousins In Binary Tree Ii
 * Intuition: Cousins are nodes at the same depth but with different parents. The total sum of cousins for a node can be found by taking the total sum of all nodes at that depth, then subtracting the node's own value and the sum of its siblings' values. This requires two passes: one to compute level sums, and another to update node values.
 * Approach: 1. Perform a Depth-First Search (DFS) traversal to compute the sum of values for all nodes at each distinct depth. Store these sums in an array where the index corresponds to the depth. 2. Perform a second DFS traversal. For each node, calculate its new value by taking the total sum for its depth (from the pre-computed array), subtracting the node's original value, and subtracting the original value of its direct siblings. Recursively apply this to children, passing the sibling's original value to each child.
 * Dry Run: Input: root = [5,4,9,1,10,null,7]
 * Tree:
 *       5 (d0)
 *      / \
 *     4   9 (d1)
 *    / \   \
 *   1  10   7 (d2)
 *
 * 1. First DFS (calculateDepthSums):
 *    - `levelSumContainer` initially `[]`
 *    - `calculateDepthSums(5, 0)` -> `levelSumContainer = [5]`
 *    - `calculateDepthSums(4, 1)` -> `levelSumContainer = [5, 4]`
 *    - `calculateDepthSums(1, 2)` -> `levelSumContainer = [5, 4, 1]`
 *    - `calculateDepthSums(10, 2)` -> `levelSumContainer = [5, 4, 1 + 10 = 11]`
 *    - `calculateDepthSums(9, 1)` -> `levelSumContainer = [5, 4 + 9 = 13, 11]`
 *    - `calculateDepthSums(7, 2)` -> `levelSumContainer = [5, 13, 11 + 7 = 18]`
 *    - Final `levelSumContainer = [5, 13, 18]`
 *
 * 2. Second DFS (updateNodeValues):
 *    - `updateNodeValues(5, 0, 0)` (root has no parent/sibling)
 *      - `leftChildInitialValue = 4`, `rightChildInitialValue = 9`
 *      - `5.val = levelSumContainer[0] - 5.val - 0 = 5 - 5 - 0 = 0`
 *      - `updateNodeValues(4, 1, 9)` (4's sibling sum is 9)
 *        - `leftChildInitialValue = 1`, `rightChildInitialValue = 10`
 *        - `4.val = levelSumContainer[1] - 4.val - 9 = 13 - 4 - 9 = 0`
 *        - `updateNodeValues(1, 2, 10)`
 *          - `1.val = levelSumContainer[2] - 1.val - 10 = 18 - 1 - 10 = 7`
 *        - `updateNodeValues(10, 2, 1)`
 *          - `10.val = levelSumContainer[2] - 10.val - 1 = 18 - 10 - 1 = 7`
 *      - `updateNodeValues(9, 1, 4)` (9's sibling sum is 4)
 *        - `leftChildInitialValue = 0`, `rightChildInitialValue = 7`
 *        - `9.val = levelSumContainer[1] - 9.val - 4 = 13 - 9 - 4 = 0`
 *        - `updateNodeValues(null, 2, ...)` -> return
 *        - `updateNodeValues(7, 2, 0)`
 *          - `7.val = levelSumContainer[2] - 7.val - 0 = 18 - 7 - 0 = 11`
 *
 * Resulting Tree:
 *       0
 *      / \
 *     0   0
 *    / \   \
 *   7  7   11
 * This matches expectations.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var replaceValueInTree = function (root) {
  const levelSumContainer = [];

  function calculateDepthSums(currentEvaluationNode, currentEvaluationDepth) {
    if (!currentEvaluationNode) {
      return;
    }

    if (levelSumContainer.length <= currentEvaluationDepth) {
      levelSumContainer.push(0);
    }
    levelSumContainer[currentEvaluationDepth] += currentEvaluationNode.val;

    const nextEvaluationDepth = currentEvaluationDepth + 1;
    calculateDepthSums(currentEvaluationNode.left, nextEvaluationDepth);
    calculateDepthSums(currentEvaluationNode.right, nextEvaluationDepth);
  }

  function updateNodeValues(
    nodeToModify,
    currentModificationDepth,
    parentSiblingTotal
  ) {
    if (!nodeToModify) {
      return;
    }

    const leftChildOriginalValue = nodeToModify.left
      ? nodeToModify.left.val
      : 0;
    const rightChildOriginalValue = nodeToModify.right
      ? nodeToModify.right.val
      : 0;

    nodeToModify.val =
      levelSumContainer[currentModificationDepth] -
      nodeToModify.val -
      parentSiblingTotal;

    const nextModificationDepth = currentModificationDepth + 1;
    updateNodeValues(
      nodeToModify.left,
      nextModificationDepth,
      rightChildOriginalValue
    );
    updateNodeValues(
      nodeToModify.right,
      nextModificationDepth,
      leftChildOriginalValue
    );
  }

  calculateDepthSums(root, 0);
  updateNodeValues(root, 0, 0);

  return root;
};
