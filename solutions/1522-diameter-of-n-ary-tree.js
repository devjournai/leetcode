/**
 * Diameter Of N Ary Tree
 * Intuition: Diameter through a node is the sum of its two deepest child heights; DFS returns height and tracks the global max path.
 * Approach: 1. Recurse children, sort depths descending. 2. Path = top+second (or top if one child). 3. Update global; return top+1.
 * Dry Run: root with child heights 1 and 2.
 *   - Path through root = 3; height returned is 3.
 * Time Complexity: O(N log K)
 * Space Complexity: O(H + K)
 */
var diameter = function (treeRoot) {
  let overallLongestPath = 0;

  function computeMaxDepth(currentNode) {
    if (!currentNode) {
      return 0;
    }

    let childDepthsList = currentNode.children.map((descendantNode) =>
      computeMaxDepth(descendantNode)
    );
    childDepthsList.sort((depthA, depthB) => depthB - depthA);

    let currentPathLength = 0;
    let topDepth = childDepthsList.length > 0 ? childDepthsList[0] : 0;
    let secondTopDepth = childDepthsList.length > 1 ? childDepthsList[1] : 0;

    if (childDepthsList.length >= 2) {
      currentPathLength = topDepth + secondTopDepth;
    } else if (childDepthsList.length === 1) {
      currentPathLength = topDepth;
    }

    overallLongestPath = Math.max(overallLongestPath, currentPathLength);

    return topDepth + 1;
  }

  computeMaxDepth(treeRoot);
  return overallLongestPath;
};
