/**
 * Find X Value of Array II
 * Intuition: Maintain a segment tree of suffix-product remainders modulo k so each update and each suffix query is O(k log n).
 * Approach: 1. Reduce nums and update values modulo k. 2. Each node stores product % k and how many prefixes of that segment have remainder r. 3. Merge left then right using left.prod. 4. For each query update index then ask remain[x] on [start, n).
 * Dry Run: nums = [2, 3], k = 2, query update then count suffix products with remainder 0.
 * Time Complexity: O(K * (N + Q log N))
 * Space Complexity: O(N * K)
 */
var resultArray = function (nums, k, queries) {
  class Node {
    constructor() {
      this.remain = new Array(k).fill(0);
      this.prod = 1;
    }
  }

  class SegmentTree {
    constructor(values, mod) {
      this.n = values.length;
      this.k = mod;
      this.tree = Array.from({ length: 4 * this.n }, () => new Node());
      this.build(values, 0, 0, this.n - 1);
    }
    merge(left, right) {
      const node = new Node();
      node.prod = (left.prod * right.prod) % this.k;
      for (let i = 0; i < this.k; i++) node.remain[i] = left.remain[i];
      for (let i = 0; i < this.k; i++) {
        node.remain[(i * left.prod) % this.k] += right.remain[i];
      }
      return node;
    }
    build(values, cur, left, right) {
      if (left === right) {
        this.tree[cur].remain[values[left]] = 1;
        this.tree[cur].prod = values[left];
        return;
      }
      const mid = Math.floor((left + right) / 2);
      this.build(values, 2 * cur + 1, left, mid);
      this.build(values, 2 * cur + 2, mid + 1, right);
      this.tree[cur] = this.merge(
        this.tree[2 * cur + 1],
        this.tree[2 * cur + 2]
      );
    }
    update(i, val) {
      const rec = (treeIndex, lo, hi) => {
        if (lo === hi) {
          for (let j = 0; j < this.k; j++) this.tree[treeIndex].remain[j] = 0;
          this.tree[treeIndex].remain[val] = 1;
          this.tree[treeIndex].prod = val;
          return;
        }
        const mid = Math.floor((lo + hi) / 2);
        if (i <= mid) rec(2 * treeIndex + 1, lo, mid);
        else rec(2 * treeIndex + 2, mid + 1, hi);
        this.tree[treeIndex] = this.merge(
          this.tree[2 * treeIndex + 1],
          this.tree[2 * treeIndex + 2]
        );
      };
      rec(0, 0, this.n - 1);
    }
    query(i, j) {
      const rec = (treeIndex, lo, hi) => {
        if (i <= lo && hi <= j) return this.tree[treeIndex];
        if (j < lo || hi < i) return new Node();
        const mid = Math.floor((lo + hi) / 2);
        return this.merge(
          rec(2 * treeIndex + 1, lo, mid),
          rec(2 * treeIndex + 2, mid + 1, hi)
        );
      };
      return rec(0, 0, this.n - 1);
    }
  }

  const mods = nums.map((num) => num % k);
  for (const query of queries) query[1] %= k;
  const n = mods.length;
  const answer = [];
  const tree = new SegmentTree(mods, k);
  for (const [index, value, start, x] of queries) {
    tree.update(index, value);
    answer.push(tree.query(start, n - 1).remain[x]);
  }
  return answer;
};
