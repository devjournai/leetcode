/**
 * Find A Corresponding Node Of A Binary Tree In A Clone Of That Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var getTargetCopy = function (original, cloned, target) {
  if (!original) {
    return null;
  }

  const originalQueue = [original];
  const clonedQueue = [cloned];

  while (originalQueue.length > 0) {
    const currentOriginalNode = originalQueue.shift();
    const currentClonedNode = clonedQueue.shift();

    if (currentOriginalNode === target) {
      return currentClonedNode;
    }

    const leftOriginalChild = currentOriginalNode.left;
    const leftClonedChild = currentClonedNode.left;
    if (leftOriginalChild) {
      originalQueue.push(leftOriginalChild);
      clonedQueue.push(leftClonedChild);
    }

    const rightOriginalChild = currentOriginalNode.right;
    const rightClonedChild = currentClonedNode.right;
    if (rightOriginalChild) {
      originalQueue.push(rightOriginalChild);
      clonedQueue.push(rightClonedChild);
    }
  }

  return null;
};
