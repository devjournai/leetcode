/**
 * Find Distance In A Binary Tree
 * Intuition: Distance between p and q is path-length(p)+path-length(q)−2*path-length(LCA). Recover root-to-node paths and drop the shared prefix.
 * Approach: 1. If p===q return 0. 2. `discoverPath` DFS records values until the target. 3. Count `commonPrefixSegments`. 4. Return (lenP − common) + (lenQ − common).
 * Dry Run: tree [3,5,1,6,2,0,8,null,null,7,4], p=5, q=0
 * paths 3-5 and 3-1-0 share prefix [3]; distance (2-1)+(3-1)=3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findDistance = function (root, p, q) {
  let initialRootNode = root;
  let targetPValue = p;
  let targetQValue = q;

  if (targetPValue === targetQValue) return 0;

  function discoverPath(pathTraversalNode, pathTargetValue, currentSequence) {
    if (!pathTraversalNode) {
      return null;
    }

    currentSequence.push(pathTraversalNode.val);

    if (pathTraversalNode.val === pathTargetValue) {
      return [...currentSequence];
    }

    let leftTraversalResult = discoverPath(
      pathTraversalNode.left,
      pathTargetValue,
      currentSequence
    );
    if (leftTraversalResult !== null) {
      return leftTraversalResult;
    }

    let rightTraversalResult = discoverPath(
      pathTraversalNode.right,
      pathTargetValue,
      currentSequence
    );
    if (rightTraversalResult !== null) {
      return rightTraversalResult;
    }

    currentSequence.pop();
    return null;
  }

  let pathArrayForP = [];
  let pathResultP = discoverPath(initialRootNode, targetPValue, pathArrayForP);

  let pathArrayForQ = [];
  let pathResultQ = discoverPath(initialRootNode, targetQValue, pathArrayForQ);

  if (!pathResultP || !pathResultQ) {
    return -1;
  }

  let commonPrefixSegments = 0;
  let minimumPathLength = Math.min(pathResultP.length, pathResultQ.length);

  let currentSegmentIndex = 0;
  while (
    currentSegmentIndex < minimumPathLength &&
    pathResultP[currentSegmentIndex] === pathResultQ[currentSegmentIndex]
  ) {
    commonPrefixSegments++;
    currentSegmentIndex++;
  }

  let totalDistanceCalculation =
    pathResultP.length -
    commonPrefixSegments +
    (pathResultQ.length - commonPrefixSegments);
  return totalDistanceCalculation;
};
