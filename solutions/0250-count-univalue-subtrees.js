/**
 * Count Univalue Subtrees
 * Intuition: A subtree is univalue only if both children (when present) are univalue themselves and equal this node’s value. Post-order DFS can count those bottoms-up.
 * Approach: 1. Recurse left and right. 2. Null is univalue. 3. Fail if a child exists and is not univalue or its value ≠ parent. 4. If this node’s subtree is univalue, increment `totalUnivalSubtrees`. 5. Return the boolean; call from root and return the count.
 * Dry Run: tree 5, left 1, right 5 with right-child 5.
 *   - Leaf 1 is univalue (count=1) but 5≠1 so left of root fails. Leaf 5 then parent 5 match (count=2,3). Root is not univalue. Return 3.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var countUnivalSubtrees = function (root) {
  let totalUnivalSubtrees = 0;

  function determineIfUnival(nodeBeingEvaluated) {
    if (nodeBeingEvaluated === null) {
      return true;
    }

    let isLeftSubtreeUniform = determineIfUnival(nodeBeingEvaluated.left);
    let isRightSubtreeUniform = determineIfUnival(nodeBeingEvaluated.right);

    let isCurrentBranchUnival = true;

    if (nodeBeingEvaluated.left !== null) {
      if (
        !isLeftSubtreeUniform ||
        nodeBeingEvaluated.left.val !== nodeBeingEvaluated.val
      ) {
        isCurrentBranchUnival = false;
      }
    }

    if (nodeBeingEvaluated.right !== null) {
      if (
        !isRightSubtreeUniform ||
        nodeBeingEvaluated.right.val !== nodeBeingEvaluated.val
      ) {
        isCurrentBranchUnival = false;
      }
    }

    if (isCurrentBranchUnival) {
      totalUnivalSubtrees++;
    }

    return isCurrentBranchUnival;
  }

  determineIfUnival(root);
  return totalUnivalSubtrees;
};
