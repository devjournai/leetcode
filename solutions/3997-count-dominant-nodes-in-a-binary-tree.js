/**
 * Count Dominant Nodes in a Binary Tree
 * Intuition: A node is dominant if its value equals the maximum value in the subtree rooted at it. Therefore, for each node, we only need the maximum values of its left and right subtrees, then compare them with the node itself.
 * Approach: A node is dominant if its value equals the maximum value in the subtree rooted at it. Therefore, for each node, we only need the maximum values of its left and right subtrees, then compare them with the node itself. Perform a bottom-up DFS: return -infty for a null node (implemented with the language's minimum integer value), and for the current node compute mx = max(leftMax, rightMax, node.val). If mx = node.val, the node is dominant and the answer is incremented by one. Finally return mx for the parent node.
 * Dry Run: Input: root = [5,3,8,2,4,7,1]. Output: 5.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var countDominantNodes = function (root) {
  let ans = 0;
  const dfs = (node) => {
    if (!node) {
      return -Infinity;
    }
    const l = dfs(node.left);
    const r = dfs(node.right);
    const mx = Math.max(l, r, node.val);
    if (mx === node.val) {
      ++ans;
    }
    return mx;
  };
  dfs(root);
  return ans;
};
