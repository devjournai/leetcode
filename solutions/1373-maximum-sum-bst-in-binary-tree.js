/**
 * Maximum Sum Bst In Binary Tree
 * Intuition: Post-order each subtree reports whether it is a BST, its min/max, and its sum. A node is a BST if both children are BSTs and node.val sits strictly between left.max and right.min.
 * Approach: 1. Empty node is a valid BST with min=+∞, max=-∞, sum 0. 2. After children, if valid, add node.val to child sums, track the global max sum (at least 0), and return updated min/max. 3. If invalid, mark the subtree unusable. 4. Return the global max BST sum.
 * Dry Run: tree 2 with left 1 and right 3.
 *   - Leaves 1 and 3 are BSTs. Root 2 is a BST (1 < 2 < 3) with sum 6. Return 6.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var maxSumBST = function (root) {
  let maximumBstSum = 0;

  function processNode(currentNode) {
    if (!currentNode) {
      return {
        isValidBst: true,
        minimumElement: Infinity,
        maximumElement: -Infinity,
        sumOfElements: 0,
      };
    }

    const leftSubtreeInfo = processNode(currentNode.left);
    const rightSubtreeInfo = processNode(currentNode.right);

    const isCurrentNodeValidBst =
      leftSubtreeInfo.isValidBst &&
      rightSubtreeInfo.isValidBst &&
      currentNode.val > leftSubtreeInfo.maximumElement &&
      currentNode.val < rightSubtreeInfo.minimumElement;

    if (isCurrentNodeValidBst) {
      const currentSubtreeValueSum =
        currentNode.val +
        leftSubtreeInfo.sumOfElements +
        rightSubtreeInfo.sumOfElements;
      maximumBstSum = Math.max(maximumBstSum, currentSubtreeValueSum);
      return {
        isValidBst: true,
        minimumElement: Math.min(
          currentNode.val,
          leftSubtreeInfo.minimumElement
        ),
        maximumElement: Math.max(
          currentNode.val,
          rightSubtreeInfo.maximumElement
        ),
        sumOfElements: currentSubtreeValueSum,
      };
    } else {
      return {
        isValidBst: false,
        minimumElement: 0,
        maximumElement: 0,
        sumOfElements: 0,
      };
    }
  }

  processNode(root);
  return maximumBstSum;
};
