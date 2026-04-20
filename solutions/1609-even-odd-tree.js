/**
 * Even Odd Tree
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var isEvenOddTree = function (root) {
  if (!root) {
    return true;
  }

  let processingNodes = [root];
  let currentDepth = 0;

  while (processingNodes.length > 0) {
    let nodesAtDepthCount = processingNodes.length;
    let previousNodeValue;

    if (currentDepth % 2 === 0) {
      previousNodeValue = -Infinity;
    } else {
      previousNodeValue = Infinity;
    }

    let nextLevelNodes = [];

    for (
      let nodeIndexIterator = 0;
      nodeIndexIterator < nodesAtDepthCount;
      nodeIndexIterator++
    ) {
      let currentNode = processingNodes[nodeIndexIterator];
      let isCurrentDepthEven = currentDepth % 2 === 0;
      let isNodeValueOdd = currentNode.val % 2 === 1;

      if (isCurrentDepthEven) {
        if (!isNodeValueOdd || currentNode.val <= previousNodeValue) {
          return false;
        }
      } else {
        if (isNodeValueOdd || currentNode.val >= previousNodeValue) {
          return false;
        }
      }

      previousNodeValue = currentNode.val;

      if (currentNode.left) {
        nextLevelNodes.push(currentNode.left);
      }
      if (currentNode.right) {
        nextLevelNodes.push(currentNode.right);
      }
    }

    processingNodes = nextLevelNodes;
    currentDepth++;
  }

  return true;
};
