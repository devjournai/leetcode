/**
 * Range Sum Of Bst
 * Intuition: In a BST, skip the left subtree when node.val ≤ low and skip the right when node.val ≥ high. Sum nodes whose values sit in [low, high].
 * Approach: 1. Null root → 0. 2. Iterative stack from root. 3. If val in range, add it. 4. Push left if val > low; push right if val < high. 5. Return `currentTotalSum`.
 * Dry Run: Tree 10 / 5,15 with 3,7 and 18. low=7 high=15 → add 10,7,15 = 32.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var rangeSumBST = function (root, low, high) {
  if (!root) {
    return 0;
  }

  let currentTotalSum = 0;
  const nodeExplorationStack = [root];

  while (nodeExplorationStack.length > 0) {
    const currentNodeForProcessing = nodeExplorationStack.pop();

    if (currentNodeForProcessing === null) {
      continue;
    }

    const nodeValueExtracted = currentNodeForProcessing.val;

    if (nodeValueExtracted >= low && nodeValueExtracted <= high) {
      currentTotalSum += nodeValueExtracted;
    }

    if (nodeValueExtracted > low) {
      nodeExplorationStack.push(currentNodeForProcessing.left);
    }

    if (nodeValueExtracted < high) {
      nodeExplorationStack.push(currentNodeForProcessing.right);
    }
  }

  return currentTotalSum;
};
