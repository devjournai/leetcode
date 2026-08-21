/**
 * Binary Tree Tilt
 * Intuition: A node's tilt is |left subtree sum − right subtree sum|. Total tilt is the sum of tilts. Post-order return each subtree's value sum while accumulating |L−R|.
 * Approach: 1. `overallTiltTracker` holds the running total. 2. Recurse: null sum is 0. 3. Get left and right sums, add |left-right| to the tracker, return val+left+right. 4. Return `accumulatedTilt`.
 * Dry Run: 1 with left 2 and right 3.
 *   - Node 2: tilt 0, sum 2. Node 3: tilt 0, sum 3. Root tilt |2-3|=1. Return 1.
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */
var findTilt = function (rootNode) {
  const overallTiltTracker = { accumulatedTilt: 0 };

  const computeSubtreeMetrics = (nodeElement, tiltRegister) => {
    if (!nodeElement) {
      return 0;
    }

    const leftBranchSum = computeSubtreeMetrics(nodeElement.left, tiltRegister);
    const rightBranchSum = computeSubtreeMetrics(
      nodeElement.right,
      tiltRegister
    );

    const nodeDelta = Math.abs(leftBranchSum - rightBranchSum);
    tiltRegister.accumulatedTilt += nodeDelta;

    const subtreeTotal = nodeElement.val + leftBranchSum + rightBranchSum;
    return subtreeTotal;
  };

  computeSubtreeMetrics(rootNode, overallTiltTracker);

  return overallTiltTracker.accumulatedTilt;
};
