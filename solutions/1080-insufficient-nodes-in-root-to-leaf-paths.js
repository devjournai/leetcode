/**
 * Insufficient Nodes In Root To Leaf Paths
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var sufficientSubset = function (rootNode, pathLimit) {
  function processPathRecursively(currentNode, currentSumValue) {
    if (currentNode === null) {
      return null;
    }

    let newCumulativeSum = currentSumValue + currentNode.val;

    if (currentNode.left === null && currentNode.right === null) {
      return newCumulativeSum >= pathLimit ? currentNode : null;
    }

    currentNode.left = processPathRecursively(
      currentNode.left,
      newCumulativeSum,
    );
    currentNode.right = processPathRecursively(
      currentNode.right,
      newCumulativeSum,
    );

    if (currentNode.left === null && currentNode.right === null) {
      return newCumulativeSum >= pathLimit ? currentNode : null;
    }

    return currentNode;
  }

  let finalTree = processPathRecursively(rootNode, 0);
  return finalTree;
};
