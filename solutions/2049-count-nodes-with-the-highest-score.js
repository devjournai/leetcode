/**
 * Count Nodes With The Highest Score
 * Intuition: The problem requires calculating a score for each node based on the sizes of subtrees formed by removing that node. This naturally suggests a Depth First Search (DFS) approach to traverse the tree and calculate subtree sizes efficiently. Each node's score involves its left child's subtree size, its right child's subtree size, and the size of the remaining tree above it.
 * Approach:
 * 1. Build an adjacency list `childConnections` to represent the tree, where each index `i` stores an array of its children. This is derived from the `parents` array.
 * 2. Initialize `maxTotalScore` (using BigInt for potentially large products) to 0 and `scoreOccurrences` to 0. These will track the highest score found and how many nodes achieve it.
 * 3. Define a recursive helper function `computeNodeScores(currentNodeIndex)` that performs a DFS.
 * 4. Inside `computeNodeScores`:
 *    a. Recursively call itself for the left child (if it exists) to get its subtree size.
 *    b. Recursively call itself for the right child (if it exists) to get its subtree size.
 *    c. Calculate `currentSubtreeTotalNodes` for the `currentNodeIndex` by summing sizes of its children's subtrees plus 1 (for itself).
 *    d. Calculate the `currentProductValue` for the `currentNodeIndex`:
 *       - Start with 1n (BigInt one).
 *       - Multiply by `leftChildSize` if `leftChildSize > 0`.
 *       - Multiply by `rightChildSize` if `rightChildSize > 0`.
 *       - Calculate `upperTreeSegmentSize = n - currentSubtreeTotalNodes`. Multiply by `upperTreeSegmentSize` if `upperTreeSegmentSize > 0`.
 *    e. Update `maxTotalScore` and `scoreOccurrences`: if `currentProductValue` is greater than `maxTotalScore`, update `maxTotalScore` and set `scoreOccurrences` to 1. If `currentProductValue` equals `maxTotalScore`, increment `scoreOccurrences`.
 *    f. Return `currentSubtreeTotalNodes`.
 * 5. Invoke `computeNodeScores(0)` starting from the root.
 * 6. Return `scoreOccurrences`.
 * Dry Run: parents = [-1, 0, 0] (n=3)
 *   - childConnections = [[1, 2], [], []]
 *   - maxTotalScore = 0n, scoreOccurrences = 0
 *   - Call computeNodeScores(0):
 *     - currentNodeIndex = 0
 *     - childConnections[0] = [1, 2]
 *     - Call computeNodeScores(1):
 *       - currentNodeIndex = 1
 *       - childConnections[1] = []
 *       - leftChildSize = 0, rightChildSize = 0
 *       - currentSubtreeTotalNodes = 0 + 0 + 1 = 1
 *       - currentProductValue = 1n.
 *         - leftChildSize (0) not > 0.
 *         - rightChildSize (0) not > 0.
 *         - upperTreeSegmentSize = 3 - 1 = 2.
 *         - currentProductValue *= 2n => 2n.
 *       - 2n > maxTotalScore (0n): maxTotalScore = 2n, scoreOccurrences = 1.
 *       - Return 1. (leftChildSize for 0 becomes 1)
 *     - Call computeNodeScores(2):
 *       - currentNodeIndex = 2
 *       - childConnections[2] = []
 *       - leftChildSize = 0, rightChildSize = 0
 *       - currentSubtreeTotalNodes = 0 + 0 + 1 = 1
 *       - currentProductValue = 1n.
 *         - leftChildSize (0) not > 0.
 *         - rightChildSize (0) not > 0.
 *         - upperTreeSegmentSize = 3 - 1 = 2.
 *         - currentProductValue *= 2n => 2n.
 *       - 2n === maxTotalScore (2n): scoreOccurrences = 2.
 *       - Return 1. (rightChildSize for 0 becomes 1)
 *     - currentSubtreeTotalNodes = 1 + 1 + 1 = 3 (for node 0)
 *     - currentProductValue = 1n.
 *       - leftChildSize (1) > 0: currentProductValue *= 1n => 1n.
 *       - rightChildSize (1) > 0: currentProductValue *= 1n => 1n.
 *       - upperTreeSegmentSize = 3 - 3 = 0.
 *       - No change.
 *     - 1n not > maxTotalScore (2n), not === maxTotalScore (2n). No update.
 *     - Return 3.
 *   - The main function receives 3, ignores it, and returns scoreOccurrences (2).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countHighestScoreNodes = function (parents) {
  const nodeCount = parents.length;
  const childConnections = Array.from({ length: nodeCount }, () => []);

  for (let childIndex = 1; childIndex < nodeCount; childIndex++) {
    childConnections[parents[childIndex]].push(childIndex);
  }

  let maxOverallScore = 0n;
  let scoreFrequency = 0;

  function calculateScoresRecursively(currentProcessingNode) {
    let currentLeftSubtreeSize = 0;
    let currentRightSubtreeSize = 0;

    if (childConnections[currentProcessingNode].length > 0) {
      currentLeftSubtreeSize = calculateScoresRecursively(
        childConnections[currentProcessingNode][0]
      );
    }
    if (childConnections[currentProcessingNode].length > 1) {
      currentRightSubtreeSize = calculateScoresRecursively(
        childConnections[currentProcessingNode][1]
      );
    }

    const currentCalculatedSubtreeSize =
      currentLeftSubtreeSize + currentRightSubtreeSize + 1;

    let currentScoreValue = 1n;
    if (currentLeftSubtreeSize > 0) {
      currentScoreValue *= BigInt(currentLeftSubtreeSize);
    }
    if (currentRightSubtreeSize > 0) {
      currentScoreValue *= BigInt(currentRightSubtreeSize);
    }
    const nodesAboveCurrent = nodeCount - currentCalculatedSubtreeSize;
    if (nodesAboveCurrent > 0) {
      currentScoreValue *= BigInt(nodesAboveCurrent);
    }

    if (currentScoreValue > maxOverallScore) {
      maxOverallScore = currentScoreValue;
      scoreFrequency = 1;
    } else if (currentScoreValue === maxOverallScore) {
      scoreFrequency++;
    }

    return currentCalculatedSubtreeSize;
  }

  calculateScoresRecursively(0);

  return scoreFrequency;
};
