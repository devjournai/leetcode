/**
 * Binary Tree Postorder Traversal
 * Intuition: Postorder is left, right, root. A first stack that visits root then pushes left then right produces root-right-left; reversing that sequence (second stack) yields left-right-root.
 * Approach: 1. If `root` is null, return []. 2. Push `root` onto `primaryStack`. 3. While `primaryStack` is non-empty, pop `currentElement`, push its `val` onto `auxiliaryStack`, then push left then right onto `primaryStack`. 4. Pop `auxiliaryStack` into `resultSequence` and return it.
 * Dry Run: tree [1,null,2,3]
 * primary pops: 1 then 2 then 3; auxiliary holds [1,2,3]
 * Reverse pop: [3,2,1]
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var postorderTraversal = function (root) {
  if (!root) {
    return [];
  }

  let primaryStack = [];
  let auxiliaryStack = [];
  let resultSequence = [];

  primaryStack.push(root);

  while (primaryStack.length > 0) {
    let currentElement = primaryStack.pop();
    auxiliaryStack.push(currentElement.val);

    if (currentElement.left) {
      primaryStack.push(currentElement.left);
    }
    if (currentElement.right) {
      primaryStack.push(currentElement.right);
    }
  }

  while (auxiliaryStack.length > 0) {
    resultSequence.push(auxiliaryStack.pop());
  }

  return resultSequence;
};
