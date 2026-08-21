/**
 * Binary Tree Longest Consecutive Sequence
 * Intuition: A consecutive path is a parent-to-child chain of values increasing by 1. DFS passes the parent value and current streak; a break resets the streak to 1.
 * Approach: 1. Empty tree → 0. 2. dfs(node, prev, len): if node.val === prev+1, len+1 else 1; update global max. 3. Recurse left and right with this node’s value and the new length. 4. Start dfs(root, root.val-1, 0) so the root counts as length 1.
 * Dry Run: 1 → 3 → 4 → 5, and 1 → 2.
 *   - Path 3-4-5 has length 3; 1-2 has length 2.
 *   - Return 3.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var longestConsecutive = function (root) {
  let globalMaxPath = 0;

  if (!root) {
    return 0;
  }

  function dfsHelper(
    currentNodeInstance,
    precedingNodeValue,
    sequenceLengthAccumulated
  ) {
    if (!currentNodeInstance) {
      return;
    }

    let currentCalculatedLength;
    if (precedingNodeValue + 1 === currentNodeInstance.val) {
      currentCalculatedLength = sequenceLengthAccumulated + 1;
    } else {
      currentCalculatedLength = 1;
    }

    globalMaxPath = Math.max(globalMaxPath, currentCalculatedLength);

    dfsHelper(
      currentNodeInstance.left,
      currentNodeInstance.val,
      currentCalculatedLength
    );
    dfsHelper(
      currentNodeInstance.right,
      currentNodeInstance.val,
      currentCalculatedLength
    );
  }

  dfsHelper(root, root.val - 1, 0);

  return globalMaxPath;
};
