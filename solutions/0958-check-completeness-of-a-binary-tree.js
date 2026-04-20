/**
 * Check Completeness Of A Binary Tree
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
