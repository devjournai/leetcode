/**
 * Check Completeness Of A Binary Tree
 * Intuition: Level-order must list all nodes before any null; a real node after a null means a gap, so the tree is not complete.
 * Approach: 1. BFS with `traversalQueue` starting at `root`, enqueueing left and right even if null. 2. On null, set `nullNodeFound`. 3. If a later `currentElement` is non-null while that flag is set, return false. 4. Otherwise true.
 * Dry Run: [1,2,3,4,5,6]. Queue drains 1,2,3,4,5,6 then nulls only after all nodes. True. If 6 were missing and a right child existed, a node after null would fail.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isCompleteTree = function (root) {
  const traversalQueue = [root];
  let nullNodeFound = false;

  while (traversalQueue.length > 0) {
    const currentElement = traversalQueue.shift();

    if (nullNodeFound && currentElement !== null) {
      return false;
    }

    if (currentElement === null) {
      nullNodeFound = true;
    } else {
      traversalQueue.push(currentElement.left);
      traversalQueue.push(currentElement.right);
    }
  }

  return true;
};
