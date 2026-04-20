/**
 * Cousins In Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var isCousins = function (root, x, y) {
  let parentOfX = null;
  let depthOfX = -1;
  let parentOfY = null;
  let depthOfY = -1;

  let queueElements = [];
  if (!root) {
    return false;
  }

  let initialQueueItem = [root, null, 0];
  queueElements.push(initialQueueItem);

  while (queueElements.length > 0) {
    let processingQueueItem = queueElements.shift();
    let currentNodePointer = processingQueueItem[0];
    let currentParentPointer = processingQueueItem[1];
    let currentLevelValue = processingQueueItem[2];

    if (currentNodePointer.val === x) {
      depthOfX = currentLevelValue;
      parentOfX = currentParentPointer;
    }

    if (currentNodePointer.val === y) {
      depthOfY = currentLevelValue;
      parentOfY = currentParentPointer;
    }

    if (depthOfX !== -1 && depthOfY !== -1) {
      break;
    }

    if (currentNodePointer.left) {
      let leftChildNode = currentNodePointer.left;
      let leftChildQueueItem = [
        leftChildNode,
        currentNodePointer,
        currentLevelValue + 1,
      ];
      queueElements.push(leftChildQueueItem);
    }

    if (currentNodePointer.right) {
      let rightChildNode = currentNodePointer.right;
      let rightChildQueueItem = [
        rightChildNode,
        currentNodePointer,
        currentLevelValue + 1,
      ];
      queueElements.push(rightChildQueueItem);
    }
  }

  return depthOfX === depthOfY && parentOfX !== parentOfY;
};
