/**
 * Find A Corresponding Node Of A Binary Tree In A Clone Of That Tree
 * Intuition: Original and cloned trees have the same shape, so a parallel BFS visits matching nodes together. When the original pointer equals target, the cloned pointer is the answer.
 * Approach: 1. Enqueue both roots. 2. Pop a pair; if original === target, return cloned. 3. Push left/right children of both in lockstep.
 * Dry Run: original = [7,4,3,null,null,6,19], target = 3.
 *   - Visit 7 then 4 then 3. Cloned node at the same BFS slot is the copy of 3. Return it.
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
