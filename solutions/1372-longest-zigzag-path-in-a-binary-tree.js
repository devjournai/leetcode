/**
 * Longest Zigzag Path In A Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var longestZigZag = function (root) {
  let maximumZigzagLength = 0;

  function depthFirstSearch(
    currentNode,
    cameFromLeftDirection,
    pathAccumulator,
  ) {
    if (!currentNode) {
      return;
    }

    maximumZigzagLength = Math.max(maximumZigzagLength, pathAccumulator);

    let nextLeftPathLength = cameFromLeftDirection ? 1 : pathAccumulator + 1;
    depthFirstSearch(currentNode.left, true, nextLeftPathLength);

    let nextRightPathLength = cameFromLeftDirection ? pathAccumulator + 1 : 1;
    depthFirstSearch(currentNode.right, false, nextRightPathLength);
  }

  depthFirstSearch(root, true, 0);
  depthFirstSearch(root, false, 0);

  return maximumZigzagLength;
};
