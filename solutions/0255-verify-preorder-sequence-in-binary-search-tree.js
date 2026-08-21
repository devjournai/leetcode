/**
 * Verify Preorder Sequence In Binary Search Tree
 * Intuition: In BST preorder, once you go right of a node, nothing later can be ≤ that node. A stack of decreasing ancestors plus a rising lower bound enforces that.
 * Approach: 1. `lowerBound = -∞`, empty stack. 2. For each value, pop while the stack top is smaller (those nodes are finished; they become the new lower bound). 3. If the value is `<= lowerBound`, invalid. 4. Push the value. 5. If the loop finishes, return true.
 * Dry Run: preorder = [5, 2, 1, 3, 6].
 *   - Push 5,2,1. 3 pops 1 then 2 (lowerBound=2), 3>2, push 3. 6 pops 3 then 5 (lowerBound=5), 6>5. Return true. [5,2,6,3] fails when 3 ≤ 5.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var verifyPreorder = function (preorder) {
  let lowerBound = -Infinity;
  const ancestorStack = [];

  for (const currentElement of preorder) {
    while (
      ancestorStack.length > 0 &&
      ancestorStack[ancestorStack.length - 1] < currentElement
    ) {
      lowerBound = ancestorStack.pop();
    }
    if (currentElement <= lowerBound) {
      return false;
    }
    ancestorStack.push(currentElement);
  }

  return true;
};
