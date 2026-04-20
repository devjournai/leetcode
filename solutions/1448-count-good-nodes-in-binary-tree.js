/**
 * Count Good Nodes In Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var goodNodes = function (root) {
  let goodNodesCounter = 0;

  const depthFirstTravel = (currentNode, maximumPathValue) => {
    if (currentNode === null) {
      return;
    }

    const nodeValue = currentNode.val;

    if (nodeValue >= maximumPathValue) {
      goodNodesCounter++;
    }

    const nextMaximumValueForChildren = Math.max(maximumPathValue, nodeValue);

    depthFirstTravel(currentNode.left, nextMaximumValueForChildren);
    depthFirstTravel(currentNode.right, nextMaximumValueForChildren);
  };

  if (root === null) {
    return 0;
  }

  depthFirstTravel(root, -Infinity);

  return goodNodesCounter;
};
