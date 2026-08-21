/**
 * Even Odd Tree
 * Intuition: Even levels must be strictly increasing odd values; odd levels must be strictly decreasing even values. Check this while walking the tree level by level.
 * Approach: 1. BFS each depth. 2. Seed previous as -∞ on even depths and +∞ on odd depths. 3. Reject a node if parity or monotonicity fails. 4. Enqueue children and increment depth. 5. Return true if every level is valid.
 * Dry Run: [1,10,4,3,null,7,9].
 *   - Depth 0: 1 odd. Depth 1: 10>4 even decreasing. Depth 2: 3<7<9 odd increasing → true.
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
