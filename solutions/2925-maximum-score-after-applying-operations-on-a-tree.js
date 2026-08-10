/**
 * Maximum Score After Applying Operations On A Tree
 * Intuition: The problem asks to maximize the score by removing node values while keeping the tree healthy. A healthy tree means every root-to-leaf path must have a non-zero sum of values. This is equivalent to minimizing the total sum of values that *must* be kept to satisfy the healthy condition, and then subtracting this minimum from the total possible score (sum of all initial values). The core idea is a recursive depth-first search (DFS) that calculates the minimum value needed for a subtree. For a leaf node, its value must be kept. For an internal node, we have two options: either keep its own value (satisfying paths passing through it downwards) or clear its value and ensure all its children subtrees collectively contribute enough minimums to keep their paths healthy. We choose the option that requires keeping the minimum total value.
 * Approach: 1. Initialize an adjacency list representation of the tree from the given `edges`. 2. Calculate the total sum of all initial `values`. 3. Implement a recursive helper function `calculateMinimumNeeded(currentNode, previousNode)` that returns the minimum value required to keep the subtree rooted at `currentNode` healthy. 4. In `calculateMinimumNeeded`: 4a. Filter direct children of `currentNode` (excluding `previousNode`) into a temporary list using an indexed `for` loop. 4b. If `currentNode` is a leaf (the temporary list is empty), return `initialValues[currentNode]` (its own value must be kept). 4c. Otherwise, recursively call `calculateMinimumNeeded` for each child (using `map` to iterate) and sum their results to get `descendantSubtreeSum`. 4d. Return the minimum of `initialValues[currentNode]` (cost if `currentNode`'s value is kept) and `descendantSubtreeSum` (cost if `currentNode`'s value is cleared and children cover the health condition). 5. The final maximum score is the `totalSum` minus the result of `calculateMinimumNeeded(0, -1)` (starting DFS from the root node 0 with a dummy parent -1).
 * Dry Run: Input: edges = [[0,1],[0,2],[0,3]], values = [1,2,3,4]
 *   totalNodeCount = 4
 *   adjacencyMap = [[1,2,3], [0], [0], [0]]
 *   fullValueSum (via while loop) = 1+2+3+4 = 10
 *   Call calculateMinimumNeeded(0, -1):
 *       currentProcessingNode = 0, parentOfCurrentNode = -1
 *       temporaryChildrenList (via for loop) = [1, 2, 3] (0's children excluding -1)
 *       isLeafNode = false
 *       descendantSubtreeSum = 0
 *       temporaryChildrenList.map loop:
 *           childToProcess = 1:
 *               Call calculateMinimumNeeded(1, 0):
 *                   currentProcessingNode = 1, parentOfCurrentNode = 0
 *                   temporaryChildrenList = [] (1's children excluding 0)
 *                   isLeafNode = true
 *                   Returns initialValues[1] = 2
 *               descendantSubtreeSum += 2 -> descendantSubtreeSum = 2
 *           childToProcess = 2:
 *               Call calculateMinimumNeeded(2, 0):
 *                   currentProcessingNode = 2, parentOfCurrentNode = 0
 *                   temporaryChildrenList = []
 *                   isLeafNode = true
 *                   Returns initialValues[2] = 3
 *               descendantSubtreeSum += 3 -> descendantSubtreeSum = 2 + 3 = 5
 *           childToProcess = 3:
 *               Call calculateMinimumNeeded(3, 0):
 *                   currentProcessingNode = 3, parentOfCurrentNode = 0
 *                   temporaryChildrenList = []
 *                   isLeafNode = true
 *                   Returns initialValues[3] = 4
 *               descendantSubtreeSum += 4 -> descendantSubtreeSum = 5 + 4 = 9
 *       End map loop.
 *       Returns Math.min(initialValues[0], descendantSubtreeSum) = Math.min(1, 9) = 1
 *   minimumRequiredSum = 1
 *   Result: fullValueSum - minimumRequiredSum = 10 - 1 = 9.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumScoreAfterOperations = function (edgeData, initialValues) {
  const totalNodeCount = initialValues.length;
  const adjacencyMap = Array.from({ length: totalNodeCount }, () => []);

  edgeData.forEach((edgePair) => {
    const firstVertex = edgePair[0];
    const secondVertex = edgePair[1];
    adjacencyMap[firstVertex].push(secondVertex);
    adjacencyMap[secondVertex].push(firstVertex);
  });

  let fullValueSum = 0;
  let currentIndex = 0;
  while (currentIndex < totalNodeCount) {
    fullValueSum += initialValues[currentIndex];
    currentIndex++;
  }

  const calculateMinimumNeeded = (
    currentProcessingNode,
    parentOfCurrentNode,
  ) => {
    let temporaryChildrenList = [];
    let iterationIndexForChildren = 0;
    for (
      ;
      iterationIndexForChildren < adjacencyMap[currentProcessingNode].length;
      ++iterationIndexForChildren
    ) {
      const potentialChildNode =
        adjacencyMap[currentProcessingNode][iterationIndexForChildren];
      if (potentialChildNode !== parentOfCurrentNode) {
        temporaryChildrenList.push(potentialChildNode);
      }
    }

    const isLeafNode = temporaryChildrenList.length === 0;
    if (isLeafNode) {
      return initialValues[currentProcessingNode];
    }

    let descendantSubtreeSum = 0;
    temporaryChildrenList.map((childToProcess) => {
      descendantSubtreeSum += calculateMinimumNeeded(
        childToProcess,
        currentProcessingNode,
      );
      return null;
    });

    return Math.min(initialValues[currentProcessingNode], descendantSubtreeSum);
  };

  const minimumRequiredSum = calculateMinimumNeeded(0, -1);

  return fullValueSum - minimumRequiredSum;
};
