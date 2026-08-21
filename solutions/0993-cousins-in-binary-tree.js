/**
 * Cousins In Binary Tree
 * Intuition: BFS stores parent and depth. x and y are cousins if `depthOfX === depthOfY` and `parentOfX !== parentOfY`.
 * Approach: 1. Queue `[node, parent, level]` from root. 2. When val matches x or y, record parent/depth. 3. Stop once both found. 4. Return the cousin predicate.
 * Dry Run: [1,2,3,4], x=4, y=3. 4 has parent 2 depth 2; 3 has parent 1 depth 1. Depths differ. False.
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
