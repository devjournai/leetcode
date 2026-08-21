/**
 * K-th Largest Perfect Subtree Size in Binary Tree
 * Intuition: A perfect binary subtree has identical perfect left and right children. Collect every such subtree size, then pick the k-th largest.
 * Approach: 1. Postorder DFS. 2. Empty is perfect of size 0. 3. If both children are perfect and equal size, this node is perfect of size 1+left+right; record it. 4. Sort sizes descending and return the k-th, or -1.
 * Dry Run: tree [5,3,6,5,2,5,7,1,8], k = 2
 *   - Perfect sizes include several 1s and a 3; 2nd largest is 3 (or whatever the samples specify)
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var kthLargestPerfectSubtree = function (root, k) {
  const sizes = [];

  const dfs = (node) => {
    if (!node) {
      return { isPerfect: true, sz: 0 };
    }
    const left = dfs(node.left);
    const right = dfs(node.right);
    if (left.isPerfect && right.isPerfect && left.sz === right.sz) {
      const sz = 1 + left.sz + right.sz;
      sizes.push(sz);
      return { isPerfect: true, sz };
    }
    return { isPerfect: false, sz: 0 };
  };

  dfs(root);
  if (sizes.length < k) {
    return -1;
  }
  sizes.sort((a, b) => b - a);
  return sizes[k - 1];
};
