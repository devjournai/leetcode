/**
 * Univalued Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var isUnivalTree = function (root) {
  if (!root) {
    return true;
  }

  const valueToCompare = root.val;
  const stackOfNodes = [root];
  let currentNode;

  while (stackOfNodes.length > 0) {
    currentNode = stackOfNodes.pop();

    if (currentNode.val !== valueToCompare) {
      return false;
    }

    if (currentNode.left) {
      stackOfNodes.push(currentNode.left);
    }

    if (currentNode.right) {
      stackOfNodes.push(currentNode.right);
    }
  }

  return true;
};
