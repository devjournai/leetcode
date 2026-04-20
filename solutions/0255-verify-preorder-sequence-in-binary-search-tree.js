/**
 * Verify Preorder Sequence In Binary Search Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var verifyPreorder = function (preorder) {
  let lowerBound = -Infinity;
  const ancestorStack = [];

  for (const currentElement of preorder) {
    while (ancestorStack.length > 0 && ancestorStack[ancestorStack.length - 1] < currentElement) {
      lowerBound = ancestorStack.pop();
    }
    if (currentElement <= lowerBound) {
      return false;
    }
    ancestorStack.push(currentElement);
  }

  return true;
};