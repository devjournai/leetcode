/**
 * Path Sum
 * Intuition: Any root-to-leaf path that sums to the target works. An explicit stack stores each node with the sum accumulated along its path.
 * Approach: 1. Null root is false. 2. Push [root, root.val]. 3. Pop a node and sum; if it is a leaf and the sum equals target, return true. 4. Push right then left children with sum + child.val so left is processed first. Empty stack → false.
 * Dry Run: Tree 5 / 4, 8 with 4 / 11 / 7,2 and target 22. Path 5-4-11-2 sums to 22 at the leaf → true.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var hasPathSum = function (root, targetSum) {
  if (!root) {
    return false;
  }

  let pathStack = [];
  pathStack.push([root, root.val]);

  while (pathStack.length > 0) {
    let currentPathData = pathStack.pop();
    let currentTreeNode = currentPathData[0];
    let accumulatedSum = currentPathData[1];

    if (!currentTreeNode.left && !currentTreeNode.right) {
      if (accumulatedSum === targetSum) {
        return true;
      }
    }

    let rightChildNode = currentTreeNode.right;
    if (rightChildNode) {
      let newSumForRight = accumulatedSum + rightChildNode.val;
      pathStack.push([rightChildNode, newSumForRight]);
    }

    let leftChildNode = currentTreeNode.left;
    if (leftChildNode) {
      let newSumForLeft = accumulatedSum + leftChildNode.val;
      pathStack.push([leftChildNode, newSumForLeft]);
    }
  }

  return false;
};
