/**
 * Number Of Good Leaf Nodes Pairs
 * Intuition: Post-order each node collects leaf distances. A good pair is a left leaf and a right leaf whose depths sum to ≤ distance.
 * Approach: 1. Leaf returns [1]. 2. Cross left/right depths counting sums ≤ distance. 3. Return incremented depths still ≤ distance.
 * Dry Run: tree 1-2-4 and 1-3, distance = 3.
 *   - Leaves 4 and 3 are 3 apart → 1 pair.
 * Time Complexity: O(N * D^2)
 * Space Complexity: O(N * D)
 */
var countPairs = function (root, distance) {
  let totalGoodPairs = 0;

  function calculateLeafDistances(currentNode) {
    if (!currentNode) {
      return [];
    }
    if (!currentNode.left && !currentNode.right) {
      return [1];
    }

    const leftSubtreeDepths = calculateLeafDistances(currentNode.left);
    const rightSubtreeDepths = calculateLeafDistances(currentNode.right);

    const leftDepthCount = leftSubtreeDepths.length;
    const rightDepthCount = rightSubtreeDepths.length;

    for (
      let currentLeftIndex = 0;
      currentLeftIndex < leftDepthCount;
      currentLeftIndex++
    ) {
      const currentLeftDepth = leftSubtreeDepths[currentLeftIndex];
      for (
        let currentRightIndex = 0;
        currentRightIndex < rightDepthCount;
        currentRightIndex++
      ) {
        const currentRightDepth = rightSubtreeDepths[currentRightIndex];
        if (currentLeftDepth + currentRightDepth <= distance) {
          totalGoodPairs++;
        }
      }
    }

    const currentIntermediateDepths = [];

    for (const depthFromLeft of leftSubtreeDepths) {
      if (depthFromLeft + 1 <= distance) {
        currentIntermediateDepths.push(depthFromLeft + 1);
      }
    }

    for (const depthFromRight of rightSubtreeDepths) {
      if (depthFromRight + 1 <= distance) {
        currentIntermediateDepths.push(depthFromRight + 1);
      }
    }

    return currentIntermediateDepths;
  }

  calculateLeafDistances(root);
  return totalGoodPairs;
};
