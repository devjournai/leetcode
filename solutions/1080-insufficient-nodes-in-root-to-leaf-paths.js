/**
 * Insufficient Nodes In Root To Leaf Paths
 * Intuition: A node stays if some root-to-leaf path through it has sum ≥ limit. Recurse with the running sum; drop leaves that fail, then drop internals whose children all disappeared.
 * Approach: 1. DFS with sum-so-far plus node.val. 2. Leaf: keep iff that path sum ≥ limit. 3. Recurse left/right with the new sum. 4. If both children become null, apply the same keep/drop rule; else keep the node.
 * Dry Run: root=1, left=2 (leaf), limit=3. Path 1+2=3 keeps both. Limit=4 drops 2 then 1 if it has no other child.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var sufficientSubset = function (rootNode, pathLimit) {
  function processPathRecursively(currentNode, currentSumValue) {
    if (currentNode === null) {
      return null;
    }

    let newCumulativeSum = currentSumValue + currentNode.val;

    if (currentNode.left === null && currentNode.right === null) {
      return newCumulativeSum >= pathLimit ? currentNode : null;
    }

    currentNode.left = processPathRecursively(
      currentNode.left,
      newCumulativeSum
    );
    currentNode.right = processPathRecursively(
      currentNode.right,
      newCumulativeSum
    );

    if (currentNode.left === null && currentNode.right === null) {
      return newCumulativeSum >= pathLimit ? currentNode : null;
    }

    return currentNode;
  }

  let finalTree = processPathRecursively(rootNode, 0);
  return finalTree;
};
