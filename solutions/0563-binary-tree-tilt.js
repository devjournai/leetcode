/**
 * Binary Tree Tilt
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
      tiltRegister,
    );

    const nodeDelta = Math.abs(leftBranchSum - rightBranchSum);
    tiltRegister.accumulatedTilt += nodeDelta;

    const subtreeTotal = nodeElement.val + leftBranchSum + rightBranchSum;
    return subtreeTotal;
  };

  computeSubtreeMetrics(rootNode, overallTiltTracker);

  return overallTiltTracker.accumulatedTilt;
};
