/**
 * 687. Longest Univalue Path
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var longestUnivaluePath = function (root) {
  let overallLongestPath = 0;

  const processNodeForPath = (currentNodeElement) => {
    if (!currentNodeElement) {
      return 0;
    }

    const pathFromLeft = processNodeForPath(currentNodeElement.left);
    const pathFromRight = processNodeForPath(currentNodeElement.right);

    const potentialLeftExtension =
      currentNodeElement.left?.val === currentNodeElement.val
        ? pathFromLeft + 1
        : 0;
    const potentialRightExtension =
      currentNodeElement.right?.val === currentNodeElement.val
        ? pathFromRight + 1
        : 0;

    overallLongestPath = Math.max(
      overallLongestPath,
      potentialLeftExtension + potentialRightExtension,
    );

    return Math.max(potentialLeftExtension, potentialRightExtension);
  };

  processNodeForPath(root);

  return overallLongestPath;
};
