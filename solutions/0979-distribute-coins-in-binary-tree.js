/**
 * Distribute Coins In Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var distributeCoins = function (root) {
  let totalTransferMoves = 0;

  function calculateSubtreeBalance(currentNode) {
    if (!currentNode) {
      return 0;
    }

    let leftSubtreeNet = calculateSubtreeBalance(currentNode.left);
    let rightSubtreeNet = calculateSubtreeBalance(currentNode.right);

    totalTransferMoves += Math.abs(leftSubtreeNet);
    totalTransferMoves += Math.abs(rightSubtreeNet);

    let currentNodesNetCoins =
      currentNode.val + leftSubtreeNet + rightSubtreeNet - 1;
    return currentNodesNetCoins;
  }

  calculateSubtreeBalance(root);
  return totalTransferMoves;
};
