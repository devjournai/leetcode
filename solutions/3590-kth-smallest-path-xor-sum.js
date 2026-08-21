/**
 * Kth Smallest Path XOR Sum
 * Intuition: Path-XOR from the root to a node is vals[node] XOR ancestors. Distinct path-XORs in a subtree form a set; the k-th smallest is a k-th order statistic. Small-to-large merging of binary tries keeps the sets.
 * Approach: 1. Build the tree from parents. 2. DFS to compute path XOR. 3. Each node gets a binary trie of distinct subtree XOR values; merge children small-to-large. 4. Answer queries with find-kth on the trie.
 * Dry Run: A star with vals [1,2,3]: root XOR 1, children 1^2 and 1^3. Query (0,2) asks the 2nd smallest among {1, 3, 2}.
 * Time Complexity: O(N log A * log A)
 * Space Complexity: O(N log A)
 */
var kthSmallest = function (par, vals, queries) {
  class Trie {
    constructor() {
      this.count = 0;
      this.children = [null, null];
    }

    add(num, delta, bit = 17) {
      this.count += delta;
      if (bit < 0) {
        return;
      }
      const b = (num >> bit) & 1;
      if (!this.children[b]) {
        this.children[b] = new Trie();
      }
      this.children[b].add(num, delta, bit - 1);
    }

    collect(prefix = 0, bit = 17, output = []) {
      if (this.count === 0) {
        return output;
      }
      if (bit < 0) {
        output.push(prefix);
        return output;
      }
      if (this.children[0]) {
        this.children[0].collect(prefix, bit - 1, output);
      }
      if (this.children[1]) {
        this.children[1].collect(prefix | (1 << bit), bit - 1, output);
      }
      return output;
    }

    exists(num, bit = 17) {
      if (this.count === 0) {
        return false;
      }
      if (bit < 0) {
        return true;
      }
      const b = (num >> bit) & 1;
      return this.children[b] ? this.children[b].exists(num, bit - 1) : false;
    }

    findKth(k, bit = 17) {
      if (k > this.count) {
        return -1;
      }
      if (bit < 0) {
        return 0;
      }
      const leftCount = this.children[0] ? this.children[0].count : 0;
      if (k <= leftCount) {
        return this.children[0].findKth(k, bit - 1);
      }
      if (this.children[1]) {
        return (1 << bit) + this.children[1].findKth(k - leftCount, bit - 1);
      }
      return -1;
    }
  }

  const n = par.length;
  const tree = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) {
    tree[par[i]].push(i);
  }

  const pathXor = vals.slice();
  const compute = (node, acc) => {
    pathXor[node] ^= acc;
    for (const child of tree[node]) {
      compute(child, pathXor[node]);
    }
  };
  compute(0, 0);

  const nodeQueries = Array.from({ length: n }, () => []);
  for (let i = 0; i < queries.length; i++) {
    const [u, k] = queries[i];
    nodeQueries[u].push([k, i]);
  }

  const tries = new Array(n);
  const result = new Array(queries.length).fill(0);

  const dfs = (node) => {
    tries[node] = new Trie();
    tries[node].add(pathXor[node], 1);
    for (const child of tree[node]) {
      dfs(child);
      if (tries[node].count < tries[child].count) {
        const tmp = tries[node];
        tries[node] = tries[child];
        tries[child] = tmp;
      }
      for (const val of tries[child].collect()) {
        if (!tries[node].exists(val)) {
          tries[node].add(val, 1);
        }
      }
    }
    for (const [k, idx] of nodeQueries[node]) {
      result[idx] = tries[node].count < k ? -1 : tries[node].findKth(k);
    }
  };

  dfs(0);
  return result;
};
