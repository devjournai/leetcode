/**
 * Binary Tree Coloring Game
 * Intuition: Second player wins by taking the largest of three regions blocked by first’s node x: left subtree of x, right subtree of x, or the rest of the tree. Winning needs strictly more than n/2 nodes.
 * Approach: 1. DFS to count subtree sizes and record left/right sizes at the node with value x. 2. parentRegion = n - left - right - 1. 3. Return max(those three) > n/2.
 * Dry Run: n = 11, x = 3, tree with 3 having left size 1 and right size 1.
 *   - Parent region 11-1-1-1=8 > 5.5. True.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var btreeGameWinningMove = function (root, n, x) {
  let playerOneLeftChildrenSize = 0;
  let playerOneRightChildrenSize = 0;

  function countAndLocatePlayerOneNode(currentNodeElement) {
    if (currentNodeElement === null) {
      return 0;
    }

    let countFromLeftBranch = countAndLocatePlayerOneNode(
      currentNodeElement.left
    );
    let countFromRightBranch = countAndLocatePlayerOneNode(
      currentNodeElement.right
    );

    if (currentNodeElement.val === x) {
      playerOneLeftChildrenSize = countFromLeftBranch;
      playerOneRightChildrenSize = countFromRightBranch;
    }

    return countFromLeftBranch + countFromRightBranch + 1;
  }

  countAndLocatePlayerOneNode(root);

  let nodesAbovePlayerOne =
    n - playerOneLeftChildrenSize - playerOneRightChildrenSize - 1;

  let largestPotentialBlueRegion = Math.max(
    nodesAbovePlayerOne,
    playerOneLeftChildrenSize,
    playerOneRightChildrenSize
  );

  return largestPotentialBlueRegion > n / 2;
};
