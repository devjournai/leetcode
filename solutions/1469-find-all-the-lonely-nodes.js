/**
 * Find All The Lonely Nodes
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
