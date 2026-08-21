/**
 * Univalued Binary Tree
 * Intuition: Every node must equal the root's value. Iterative DFS with a stack checks `currentNode.val` against `valueToCompare`.
 * Approach: 1. Empty tree is true. 2. Push `root`, pop until empty. 3. If a node's val differs, return false. 4. Push left and right children. 5. Return true if the stack drains.
 * Dry Run: [1,1,1,1,1,null,1]. All popped nodes are 1. True. A 2 anywhere returns false immediately.
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
