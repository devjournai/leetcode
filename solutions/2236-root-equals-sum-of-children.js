/**
 * Root Equals Sum Of Children
 * Intuition: The problem specifies a tree with exactly three nodes: root, left child, and right child. This implies direct access to all necessary node values without needing to traverse or handle missing children. The core task is a simple arithmetic check comparing the root's value to the sum of its children's values.
 * Approach: 1. Retrieve the value of the root node. 2. Retrieve the value of its left child. 3. Retrieve the value of its right child. 4. Calculate the sum of the left and right child values. 5. Compare the root's value with this calculated sum. 6. Return the boolean result of this comparison.
 * Dry Run:
 * Input: root = [10, 4, 6] (representing root.val = 10, root.left.val = 4, root.right.val = 6)
 * 1. primaryNodeValue = root.val => 10
 * 2. leftSubNodeValue = root.left.val => 4
 * 3. rightSubNodeValue = root.right.val => 6
 * 4. sumOfChildrenValues = leftSubNodeValue + rightSubNodeValue => 4 + 6 => 10
 * 5. Return primaryNodeValue === sumOfChildrenValues => 10 === 10 => true
 *
 * Input: root = [5, 1, 2] (representing root.val = 5, root.left.val = 1, root.right.val = 2)
 * 1. currentRootValue = root.val => 5
 * 2. firstBranchValue = root.left.val => 1
 * 3. secondBranchValue = root.right.val => 2
 * 4. totalDescendantValue = firstBranchValue + secondBranchValue => 1 + 2 => 3
 * 5. Return currentRootValue === totalDescendantValue => 5 === 3 => false
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var checkTree = function (root) {
  const primaryNodeValue = root.val;
  const leftSubNodeValue = root.left.val;
  const rightSubNodeValue = root.right.val;
  const sumOfChildrenValues = leftSubNodeValue + rightSubNodeValue;

  return primaryNodeValue === sumOfChildrenValues;
};
