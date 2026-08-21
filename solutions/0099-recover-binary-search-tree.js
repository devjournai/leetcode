/**
 * Recover Binary Search Tree
 * Intuition: Two nodes swapped in a BST create one or two inversions in inorder order; the first inversion’s previous node and the last inversion’s current node are the swapped pair.
 * Approach: 1. Recursive inorder, tracking `previousNodeInOrder`. 2. When previous.val > current.val, set first candidate to previous if unset, always set second to current. 3. After the walk, swap the two candidates’ values.
 * Dry Run: [1,3,null,null,2] inorder 1,3,2 → first=3, second=2 → swap values → [1,2,null,null,3]
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var recoverTree = function (root) {
  let firstViolationCandidate = null;
  let secondViolationCandidate = null;
  let previousNodeInOrder = null;

  const performInOrderTraversal = (currentTreeRoot) => {
    if (!currentTreeRoot) {
      return;
    }

    performInOrderTraversal(currentTreeRoot.left);

    if (
      previousNodeInOrder !== null &&
      previousNodeInOrder.val > currentTreeRoot.val
    ) {
      if (firstViolationCandidate === null) {
        firstViolationCandidate = previousNodeInOrder;
      }
      secondViolationCandidate = currentTreeRoot;
    }

    previousNodeInOrder = currentTreeRoot;

    performInOrderTraversal(currentTreeRoot.right);
  };

  performInOrderTraversal(root);

  const temporaryValue = firstViolationCandidate.val;
  firstViolationCandidate.val = secondViolationCandidate.val;
  secondViolationCandidate.val = temporaryValue;
};
