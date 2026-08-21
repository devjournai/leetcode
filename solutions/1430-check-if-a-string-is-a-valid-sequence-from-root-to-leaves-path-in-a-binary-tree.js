/**
 * Check If A String Is A Valid Sequence From Root To Leaves Path In A Binary Tree
 * Intuition: DFS matching arr[level] at each node. The last index must land on a leaf; mismatches or running past the array fail.
 * Approach: 1. Recurse with (node, level). 2. Reject null nodes, level past arr, or value mismatch. 3. At the last index, return whether the node is a leaf. 4. Otherwise try left or right at level+1.
 * Dry Run: tree 0-1-0 with left 1 having children 0 and 1; arr = [0,1,0]
 *   - root 0 matches arr[0]
 *   - left 1 matches arr[1]
 *   - left child 0 matches arr[2] and is a leaf. Return true.
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
      nextLevelIndex
    );
    const rightSubtreeResult = traverseAndCheck(
      currentNode.right,
      nextLevelIndex
    );

    return leftSubtreeResult || rightSubtreeResult;
  };

  return traverseAndCheck(root, 0);
};
