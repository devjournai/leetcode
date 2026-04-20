/**
 * Diameter Of N Ary Tree
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
      computeMaxDepth(descendantNode),
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
