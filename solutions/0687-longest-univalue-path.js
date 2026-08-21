/**
 * 687. Longest Univalue Path
 * Intuition: At each node, a univalue path can go up through one child (return value) or across both children (global answer). Only extend a child path when that child’s value equals the node.
 * Approach: 1. `processNodeForPath` returns 0 for null. 2. Recurse left/right. 3. `potentialLeftExtension`/`potentialRightExtension` are child+1 or 0. 4. Update `overallLongestPath` with their sum. 5. Return the max of the two extensions.
 * Dry Run: 5 / 4 5 / 1 1  5. At right 5: right child 5 extends 1; left none. At root: left 4 no extend, right extend 1. overallLongestPath=2 (the two 5s plus the lower 5).
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var longestUnivaluePath = function (root) {
  let overallLongestPath = 0;

  const processNodeForPath = (currentNodeElement) => {
    if (!currentNodeElement) {
      return 0;
    }

    const pathFromLeft = processNodeForPath(currentNodeElement.left);
    const pathFromRight = processNodeForPath(currentNodeElement.right);

    const potentialLeftExtension =
      currentNodeElement.left?.val === currentNodeElement.val
        ? pathFromLeft + 1
        : 0;
    const potentialRightExtension =
      currentNodeElement.right?.val === currentNodeElement.val
        ? pathFromRight + 1
        : 0;

    overallLongestPath = Math.max(
      overallLongestPath,
      potentialLeftExtension + potentialRightExtension
    );

    return Math.max(potentialLeftExtension, potentialRightExtension);
  };

  processNodeForPath(root);

  return overallLongestPath;
};
