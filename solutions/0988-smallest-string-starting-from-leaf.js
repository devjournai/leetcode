/**
 * Smallest String Starting From Leaf
 * Time Complexity: O(N * H)
 * Space Complexity: O(H)
 */
var smallestFromLeaf = function (root) {
  let globalSmallestString = null;

  function performDfs(nodeBeingVisited, currentPathParts) {
    if (!nodeBeingVisited) {
      return;
    }

    const nodeCharValue = String.fromCharCode(nodeBeingVisited.val + 97);
    currentPathParts.unshift(nodeCharValue);

    if (!nodeBeingVisited.left && !nodeBeingVisited.right) {
      const candidateStringFromLeaf = currentPathParts.join("");
      if (
        globalSmallestString === null ||
        candidateStringFromLeaf < globalSmallestString
      ) {
        globalSmallestString = candidateStringFromLeaf;
      }
    }

    const leftNodeChild = nodeBeingVisited.left;
    performDfs(leftNodeChild, currentPathParts);

    const rightNodeChild = nodeBeingVisited.right;
    performDfs(rightNodeChild, currentPathParts);

    currentPathParts.shift();
  }

  performDfs(root, []);

  return globalSmallestString || "";
};
