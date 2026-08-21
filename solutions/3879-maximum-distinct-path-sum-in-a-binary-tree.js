/**
 * Maximum Distinct Path Sum in a Binary Tree
 * Intuition: We can treat the tree as an undirected graph, using a hash table $g$ to store the adjacent nodes of each node, where $g[node]$ contains the parent node, left child node, and right child node of $node$. We use depth-first search to traverse the tree and build the hash table $g$. For each node, we add its parent node, left child node, and right child node to $g[node]$. Next, we use another depth-first search to compute the maximum path sum starting from each node. During this process, we use a hash set $vis$ to record the node values already visited on the current path, ensuring all node values along the path are distinct. For each node, we first check whether it is already in $vis$; if so, we return $0$. Otherwise, we add the node value to $vis$ and compute the path sum starting from that node. We traverse the adjacent nodes in $g[node]$, recursively compute the path sum starting from eac...
 * Approach: We can treat the tree as an undirected graph, using a hash table $g$ to store the adjacent nodes of each node, where $g[node]$ contains the parent node, left child node, and right child node of $node$. We use depth-first search to traverse the tree and build the hash table $g$. For each node, we add its parent node, left child node, and right child node to $g[node]$. Next, we use another depth-first search to compute the maximum path sum starting from each node. During this process, we use a hash set $vis$ to record the node values already visited on the current path, ensuring all node values along the path are distinct. For each node, we first check whether it is already in $vis$; if so, we return $0$. Otherwise, we add the node value to $vis$ and compute the path sum starting from that node. We traverse the adjacent nodes in $g[node]$, recursively compute the path sum starting from eac...
 * Dry Run: Input: root = [2,2,1] => Output: 3
 * Time Complexity: O(O(n^2))
 * Space Complexity: O(O(n))
 */
/**
 * Definition for a binary tree node.
 * var TreeNode = function () {

};

 */
var maxSum = function (root) {
  const g = new Map();

  function dfs(node, p) {
    if (!node) return;
    if (!g.has(node)) g.set(node, []);
    g.get(node).push(p, node.left, node.right);
    dfs(node.left, node);
    dfs(node.right, node);
  }

  const vis = new Set();

  function dfs2(node) {
    if (!node || vis.has(node.val)) return 0;
    vis.add(node.val);
    let res = node.val;
    let best = 0;
    for (const nxt of g.get(node) || []) {
      best = Math.max(best, dfs2(nxt));
    }
    vis.delete(node.val);
    return res + best;
  }

  dfs(root, null);

  let ans = -Infinity;
  for (const node of g.keys()) {
    ans = Math.max(ans, dfs2(node));
    vis.clear();
  }
  return ans;
};
