/**
 * Same Tree
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
