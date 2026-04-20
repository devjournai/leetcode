/**
 * Binary Tree Coloring Game
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
      currentNodeElement.left,
    );
    let countFromRightBranch = countAndLocatePlayerOneNode(
      currentNodeElement.right,
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
    playerOneRightChildrenSize,
  );

  return largestPotentialBlueRegion > n / 2;
};
