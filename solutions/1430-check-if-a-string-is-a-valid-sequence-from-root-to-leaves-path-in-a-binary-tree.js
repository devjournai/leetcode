/**
 * Check If A String Is A Valid Sequence From Root To Leaves Path In A Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(min(H, M))
 */
var isValidSequence = function (root, arr) {
  const sequenceLength = arr.length;

  const traverseAndCheck = (currentNode, currentLevel) => {
    if (!currentNode) {
      return false;
    }

    if (currentLevel >= sequenceLength) {
      return false;
    }

    if (currentNode.val !== arr[currentLevel]) {
      return false;
    }

    if (currentLevel === sequenceLength - 1) {
      const isLeafNode = !currentNode.left && !currentNode.right;
      return isLeafNode;
    }

    const nextLevelIndex = currentLevel + 1;
    const leftSubtreeResult = traverseAndCheck(
      currentNode.left,
      nextLevelIndex,
    );
    const rightSubtreeResult = traverseAndCheck(
      currentNode.right,
      nextLevelIndex,
    );

    return leftSubtreeResult || rightSubtreeResult;
  };

  return traverseAndCheck(root, 0);
};
