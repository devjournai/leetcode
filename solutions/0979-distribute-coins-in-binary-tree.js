/**
 * Distribute Coins In Binary Tree
 * Intuition: Each subtree returns excess coins (val + children excess − 1). Every excess coin crossing an edge is one move (`Math.abs` of left/right nets).
 * Approach: 1. Postorder `calculateSubtreeBalance`. 2. Null returns 0. 3. Add |left| and |right| to `totalTransferMoves`. 4. Return `val + left + right - 1`. 5. Return the move total.
 * Dry Run: [3,0,0]. Left excess −1, right −1; moves += 1+1; root returns 3-1-1-1=0. Answer 2.
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
