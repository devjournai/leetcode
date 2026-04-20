/**
 * Pseudo Palindromic Paths In A Binary Tree
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
