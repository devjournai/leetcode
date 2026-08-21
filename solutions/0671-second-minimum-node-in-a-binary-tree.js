/**
 * Second Minimum Node In A Binary Tree
 * Intuition: The tree's minimum is always `root.val`. Any node strictly larger than that min is a second-min candidate, so its subtree can be skipped; nodes equal to the min must be expanded.
 * Approach: 1. Null root returns -1. 2. Store `overallMinimum = root.val`. 3. `processTreeForSecondMin` returns Infinity for null, the node value if it is > min, else `Math.min` of left and right recursive results. 4. Map Infinity to -1.
 * Dry Run: root=2, left=2, right=5 (right's children 5 and 7). overallMinimum=2. Root 2 expands; left 2 expands to Inf/Inf; right 5>2 so return 5. min(Inf,5)=5.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var findSecondMinimumValue = function (root) {
  if (!root) {
    return -1;
  }

  let overallMinimum = root.val;

  function processTreeForSecondMin(currentTreeNode) {
    if (!currentTreeNode) {
      return Infinity;
    }

    if (currentTreeNode.val > overallMinimum) {
      return currentTreeNode.val;
    }

    let firstCandidate = processTreeForSecondMin(currentTreeNode.left);
    let secondCandidate = processTreeForSecondMin(currentTreeNode.right);

    return Math.min(firstCandidate, secondCandidate);
  }

  let resultingSecondMinimum = processTreeForSecondMin(root);

  return resultingSecondMinimum === Infinity ? -1 : resultingSecondMinimum;
};
