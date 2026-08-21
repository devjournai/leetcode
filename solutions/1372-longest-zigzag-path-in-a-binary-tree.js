/**
 * Longest Zigzag Path In A Binary Tree
 * Intuition: A zigzag continues only when the next step flips left/right. Track whether the last step was left and the length so far; going the same way restarts at length 1.
 * Approach: 1. DFS(node, cameFromLeft, pathLen) updates the global max. 2. Left child: length is pathLen+1 if we did not come from left, else 1. 3. Right child is the opposite. 4. Start twice from the root with dummy directions.
 * Dry Run: root with left child only, that child has a right child.
 *   - Path root→left (len 1) then left→right (len 2). Max = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var longestZigZag = function (root) {
  let maximumZigzagLength = 0;

  function depthFirstSearch(
    currentNode,
    cameFromLeftDirection,
    pathAccumulator
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
