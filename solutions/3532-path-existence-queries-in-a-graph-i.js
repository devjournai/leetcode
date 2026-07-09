/**
 * Path Existence Queries in a Graph I
 * Intuition: The problem asks for path existence between nodes in a graph, which is a classic connected components problem. Disjoint Set Union (DSU) is an efficient data structure to manage connected components. The core challenge is to efficiently build the DSU structure by identifying all necessary edges without iterating through all O(N^2) potential edges.
 * Approach:
 * 1. Initialize a DSU structure for 'n' nodes.
 * 2. Build the graph's connectivity: The condition for an edge between nodes `i` and `j` is `|nums[i] - nums[j]| <= maxDiff`. Since the `nums` array is sorted in non-decreasing order, for any `i < j`, this condition simplifies to `nums[j] - nums[i] <= maxDiff`.
 *    A critical observation here is that if `nums[j] - nums[i] <= maxDiff` for some `i < j`, it implies that for *every* adjacent pair `(k, k+1)` in the range `[i, j-1]`, the condition `nums[k+1] - nums[k] <= maxDiff` must also hold.
 *    Proof: Assume, for contradiction, that there exists some `k` in `[i, j-1]` such that `nums[k+1] - nums[k] > maxDiff`. Since `nums` is non-decreasing, all `(nums[m+1] - nums[m])` terms are non-negative. The sum `nums[j] - nums[i]` can be expressed as `(nums[i+1] - nums[i]) + (nums[i+2] - nums[i+1]) + ... + (nums[j] - nums[j-1])`. If any single term `(nums[k+1] - nums[k])` in this sum is greater than `maxDiff`, then the entire sum `nums[j] - nums[i]` must also be greater than `maxDiff` (as all other terms are non-negative). This contradicts our initial assumption that `nums[j] - nums[i] <= maxDiff`. Therefore, for an edge `(i, j)` to exist (where `i < j`), every adjacent pair `(k, k+1)` between `i` and `j` must also satisfy the `maxDiff` condition.
 *    This implies that if `(i, j)` is an edge in the true graph, there is a path `i -> i+1 -> ... -> j` where every step is also an edge. Thus, it is sufficient to connect only adjacent nodes `(i, i+1)` if `nums[i+1] - nums[i] <= maxDiff`. All other indirect connections will be established transitively by these basic adjacent connections.
 * 3. After building the DSU structure, process each query `[ui, vi]`. For each query, determine if `ui` and `vi` belong to the same connected component by checking if `dsu.find(ui) === dsu.find(vi)`. Store the boolean result.
 * 4. Return the array of boolean results.
 * Dry Run: Example 2: n = 4, nums = [2,5,6,8], maxDiff = 2, queries = [[0,1],[0,2],[1,3],[2,3]]
 * DSU initialized: parent = [0,1,2,3], rank = [0,0,0,0]
 *
 * Build DSU:
 * i = 0: nums[0]=2, nums[1]=5. diff = 5-2 = 3. 3 > maxDiff (2). No union.
 * i = 1: nums[1]=5, nums[2]=6. diff = 6-5 = 1. 1 <= maxDiff (2). Union(1,2).
 *        find(1)=1, find(2)=2. parent[2]=1, rank[1]=1. DSU state: p=[0,1,1,3], r=[0,1,0,0]
 * i = 2: nums[2]=6, nums[3]=8. diff = 8-6 = 2. 2 <= maxDiff (2). Union(2,3).
 *        find(2)=find(parent[2])=find(1)=1. find(3)=3. roots are 1 and 3.
 *        parent[3]=1, rank[1]=1. DSU state: p=[0,1,1,1], r=[0,1,0,0]
 * Final DSU components: {0}, {1,2,3}
 *
 * Process Queries:
 * queries[0] = [0,1]: find(0)=0, find(1)=1. 0 !== 1. Result: false.
 * queries[1] = [0,2]: find(0)=0, find(2)=1. 0 !== 1. Result: false.
 * queries[2] = [1,3]: find(1)=1, find(3)=1. 1 === 1. Result: true.
 * queries[3] = [2,3]: find(2)=1, find(3)=1. 1 === 1. Result: true.
 * Output: [false, false, true, true]. Matches example.
 * Time Complexity: O((N + Q) * α(N))
 * Space Complexity: O(N)
 */
class DSU {
  constructor(n) {
    this.parent = new Array(n);
    this.rank = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  find(i) {
    if (this.parent[i] === i) {
      return i;
    }
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);

    if (rootI !== rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
      return true;
    }
    return false;
  }
}

var pathExistenceQueries = function (n, nums, maxDiff, queries) {
  const dsu = new DSU(n);

  for (let i = 0; i < n - 1; i++) {
    if (nums[i + 1] - nums[i] <= maxDiff) {
      dsu.union(i, i + 1);
    }
  }

  const results = new Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const [ui, vi] = queries[i];
    results[i] = dsu.find(ui) === dsu.find(vi);
  }

  return results;
};
