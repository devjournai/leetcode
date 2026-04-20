/**
 * Find Root Of N Ary Tree
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
