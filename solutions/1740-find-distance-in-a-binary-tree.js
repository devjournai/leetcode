/**
 * Find Distance In A Binary Tree
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
      currentSequence,
    );
    if (leftTraversalResult !== null) {
      return leftTraversalResult;
    }

    let rightTraversalResult = discoverPath(
      pathTraversalNode.right,
      pathTargetValue,
      currentSequence,
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
