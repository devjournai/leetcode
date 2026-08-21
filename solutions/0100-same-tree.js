/**
 * Same Tree
 * Intuition: Two trees are the same when corresponding nodes are both null or both exist with equal values and identical left and right subtrees.
 * Approach: 1. If both null, true. 2. If exactly one null, false. 3. If values differ, false. 4. Recurse on left pairs and right pairs and AND the results.
 * Dry Run: p=[1,2,3], q=[1,2,3] → roots 1 match, left 2 match, right 3 match → true; q=[1,null,2] fails on left null vs 2
 * Time Complexity: O(min(N, M))
 * Space Complexity: O(min(H_p, H_q))
 */
var isSameTree = function (p, q) {
  if (p === null && q === null) {
    return true;
  } else if (p === null || q === null) {
    return false;
  } else {
    if (p.val !== q.val) {
      return false;
    }

    let leftBranchResult = isSameTree(p.left, q.left);
    let rightBranchResult = isSameTree(p.right, q.right);

    return leftBranchResult && rightBranchResult;
  }
};
