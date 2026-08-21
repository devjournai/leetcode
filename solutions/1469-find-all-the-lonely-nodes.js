/**
 * Find All The Lonely Nodes
 * Intuition: A lonely node is the only child of its parent. DFS and record a child whenever the other sibling is missing.
 * Approach: 1. Recurse processNodeChildren. 2. If only left exists, push left.val; if only right exists, push right.val. 3. Recurse into both children. 4. Return the collection.
 * Dry Run: root 1 with only left 2, and 2 has only right 4
 *   - 2 is lonely, 4 is lonely. Return [2,4] (order of DFS).
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var getLonelyNodes = function (treeRoot) {
  const lonelyNodesCollection = [];

  function processNodeChildren(currentNode) {
    if (!currentNode) {
      return;
    }

    const currentLeftChild = currentNode.left;
    const currentRightChild = currentNode.right;

    if (currentLeftChild && !currentRightChild) {
      lonelyNodesCollection.push(currentLeftChild.val);
    } else if (!currentLeftChild && currentRightChild) {
      lonelyNodesCollection.push(currentRightChild.val);
    }

    processNodeChildren(currentLeftChild);
    processNodeChildren(currentRightChild);
  }

  processNodeChildren(treeRoot);
  return lonelyNodesCollection;
};
