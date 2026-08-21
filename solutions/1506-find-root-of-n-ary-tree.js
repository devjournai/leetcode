/**
 * Find Root Of N Ary Tree
 * Intuition: Every child also appears as a node, so XOR of all node values XOR XOR of all children leaves the unique root value.
 * Approach: 1. XOR every node.val and every child.val. 2. Root value is nodesXOR ^ childrenXOR. 3. Return the node with that val.
 * Dry Run: nodes 1,2,3 with 1 → [2,3].
 *   - nodesXOR=1^2^3, childrenXOR=2^3 → root value 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findRoot = function (tree) {
  let accumulatedXORSumNodes = 0;
  let accumulatedXORSumChildren = 0;

  for (const currentTreeNode of tree) {
    accumulatedXORSumNodes ^= currentTreeNode.val;
    for (const currentChildOfNode of currentTreeNode.children) {
      accumulatedXORSumChildren ^= currentChildOfNode.val;
    }
  }

  const computedRootValue = accumulatedXORSumNodes ^ accumulatedXORSumChildren;

  for (const finalCandidateNode of tree) {
    if (finalCandidateNode.val === computedRootValue) {
      return finalCandidateNode;
    }
  }
};
