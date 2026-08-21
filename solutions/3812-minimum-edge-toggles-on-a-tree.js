/**
 * Minimum Edge Toggles on a Tree
 * Intuition: We define an adjacency list $g$ to represent the tree, where $g[a]$ stores all adjacent nodes of node $a$ and the indices of the corresponding edges. We design a function $\text{dfs}(a, \text{fa})$, which indicates whether the edge between node $a$ and $\text{fa}$ needs to be toggled in the subtree rooted at node $a$ with parent $\text{fa}$. The logic of the function $\text{dfs}(a, \text{fa})$ is as follows: 1. Initialize a boolean variable $\text{rev}$, indicating whether node $a$ needs to be toggled. The initial value is $\text{start}[a] \ne \text{target}[a]$. 2. Iterate through all adjacent nodes $b$ of node $a$ and the corresponding edge index $i$: - If $b \ne \text{fa}$, recursively call $\text{dfs}(b, a)$. - If the recursive call returns true, it means the edge $[a, b]$ in the subtree needs to be toggled. We add the edge index $i$ to the answer list and toggle $\text{rev}$. 3. Retu...
 * Approach: We define an adjacency list $g$ to represent the tree, where $g[a]$ stores all adjacent nodes of node $a$ and the indices of the corresponding edges. We design a function $\text{dfs}(a, \text{fa})$, which indicates whether the edge between node $a$ and $\text{fa}$ needs to be toggled in the subtree rooted at node $a$ with parent $\text{fa}$. The logic of the function $\text{dfs}(a, \text{fa})$ is as follows: 1. Initialize a boolean variable $\text{rev}$, indicating whether node $a$ needs to be toggled. The initial value is $\text{start}[a] \ne \text{target}[a]$. 2. Iterate through all adjacent nodes $b$ of node $a$ and the corresponding edge index $i$: - If $b \ne \text{fa}$, recursively call $\text{dfs}(b, a)$. - If the recursive call returns true, it means the edge $[a, b]$ in the subtree needs to be toggled. We add the edge index $i$ to the answer list and toggle $\text{rev}$. 3. Retu...
 * Dry Run: Input: n = 3, edges = [[0,1],[1,2]], start = &quot;010&quot;, target = &quot;100&quot; => Output: [0]
 * Time Complexity: O(O(n * log n))
 * Space Complexity: O(O(n))
 */
var minimumFlips = function (n, edges, start, target) {
  const g = Array.from({ length }, () => []);
  for (let i = 0; i < n - 1; i++) {
    const [a, b] = edges[i];
    g[a].push([b, i]);
    g[b].push([a, i]);
  }
  const ans = [];
  const dfs = (a, fa) => {
    let rev = start[a] !== target[a];
    for (const [b, i] of g[a]) {
      if (b !== fa && dfs(b, a)) {
        ans.push(i);
        rev = !rev;
      }
    }
    return rev;
  };
  if (dfs(0, -1)) {
    return [-1];
  }
  ans.sort((x, y) => x - y);
  return ans;
};
