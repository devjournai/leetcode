/**
 * Evaluate Boolean Binary Tree
 * Intuition: The problem describes a hierarchical evaluation process where the result of a parent node depends on the evaluation of its children. This naturally suggests a recursive, post-order traversal approach where children are evaluated first before their parent's operation is applied.
 * Approach: 1. Define a recursive function that takes a TreeNode as input. 2. Establish the base case: If the current node is a leaf (has no children), return `true` if its value is 1, and `false` if its value is 0. 3. For the recursive step (non-leaf nodes): Recursively call the function on the left child to get its boolean evaluation. 4. Recursively call the function on the right child to get its boolean evaluation. 5. Based on the current node's value (2 for OR, 3 for AND), apply the corresponding boolean operation to the results obtained from the children and return the final boolean value.
 * Dry Run: Let's trace `root = [2,1,3,null,null,0,1]`
 *   1. `evaluateTree(root)`: `root.val = 2` (OR), not a leaf.
 *   2. Calls `evaluateTree(root.left)`: `root.left.val = 1` (True), is a leaf.
 *      - Returns `1 === 1` which is `true`. This is assigned to `leftChildEvaluation`.
 *   3. Calls `evaluateTree(root.right)`: `root.right.val = 3` (AND), not a leaf.
 *      4. Calls `evaluateTree(root.right.left)`: `root.right.left.val = 0` (False), is a leaf.
 *         - Returns `0 === 1` which is `false`. This is assigned to `childOneEvaluation`.
 *      5. Calls `evaluateTree(root.right.right)`: `root.right.right.val = 1` (True), is a leaf.
 *         - Returns `1 === 1` which is `true`. This is assigned to `childTwoEvaluation`.
 *      6. `root.right.val = 3` (AND). Evaluates `childOneEvaluation && childTwoEvaluation` which is `false && true` -> `false`. This is returned and assigned to `rightChildEvaluation`.
 *   7. `root.val = 2` (OR). Evaluates `leftChildEvaluation || rightChildEvaluation` which is `true || false` -> `true`.
 *   8. Final result: `true`.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var evaluateTree = function (currentEvaluationNode) {
  if (!currentEvaluationNode.left && !currentEvaluationNode.right) {
    return currentEvaluationNode.val === 1;
  }

  const leftNodeResult = evaluateTree(currentEvaluationNode.left);
  const rightNodeResult = evaluateTree(currentEvaluationNode.right);

  if (currentEvaluationNode.val === 2) {
    return leftNodeResult || rightNodeResult;
  } else {
    return leftNodeResult && rightNodeResult;
  }
};
