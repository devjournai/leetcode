/**
 * Pseudo Palindromic Paths In A Binary Tree
 * Intuition: A path is pseudo-palindromic if at most one digit has odd frequency. XOR a bit per digit along the path; at a leaf, bitmask & (bitmask-1) == 0 means 0 or 1 bits set.
 * Approach: 1. DFS with currentPathBitmask. 2. XOR 1<<node.val. 3. On a leaf, increment if the bitmask has at most one bit. 4. Recurse into existing children.
 * Dry Run: tree 2 / 3 1, with extra 3 under left 3
 *   - path 2-3-3: bits for 2 and even 3s -> one odd (2), counts
 *   - typical sample yields 2
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var pseudoPalindromicPaths = function (inputRoot) {
  let globalPseudoCount = 0;

  function recursiveDfsPath(activeNode, currentPathBitmask) {
    if (!activeNode) {
      return;
    }

    let nextPathBitmask = currentPathBitmask ^ (1 << activeNode.val);

    if (!activeNode.left && !activeNode.right) {
      if ((nextPathBitmask & (nextPathBitmask - 1)) === 0) {
        globalPseudoCount++;
      }
      return;
    }

    let leftSubtree = activeNode.left;
    if (leftSubtree) {
      recursiveDfsPath(leftSubtree, nextPathBitmask);
    }

    let rightSubtree = activeNode.right;
    if (rightSubtree) {
      recursiveDfsPath(rightSubtree, nextPathBitmask);
    }
  }

  recursiveDfsPath(inputRoot, 0);

  return globalPseudoCount;
};
