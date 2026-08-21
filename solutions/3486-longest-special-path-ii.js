/**
 * Longest Special Path II
 * Intuition: A special path may repeat at most one value. DFS from the root along the unique tree path, keeping prefix distances and the last depth of each value. The two latest "repeat cuts" bound the longest valid suffix ending at the current node.
 * Approach: 1. Build an undirected weighted graph. 2. DFS with prefix sums, lastSeenDepth, and leftBoundary of size 2 (initially [0,0]). 3. On a repeated value, push its previous depth and keep the two largest cuts. 4. Path length is prefix.back - prefix[leftBoundary[0]]; node count is prefix.size - leftBoundary[0]. 5. Track max length, breaking ties with fewer nodes. 6. Restore lastSeenDepth after recursion.
 * Dry Run: edges = [[0,1,2],[1,2,3]], nums = [1,2,1].
 *   - Path 0-1-2 has values 1,2,1 (one duplicate). Length 5, nodes 3.
 *   - That pair is [5,3] if it is the best.
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 */
var longestSpecialPath = function (edges, nums) {
  const graph = Array.from({ length: nums.length }, () => []);
  for (const edge of edges) {
    const u = edge[0];
    const v = edge[1];
    const w = edge[2];
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }

  let maxLength = 0;
  let minNodes = 1;
  const prefix = [0];
  const lastSeenDepth = new Map();

  const dfs = (u, prev, leftBoundary) => {
    const prevDepth = lastSeenDepth.has(nums[u])
      ? lastSeenDepth.get(nums[u])
      : 0;
    lastSeenDepth.set(nums[u], prefix.length);

    if (prevDepth !== 0) {
      leftBoundary = leftBoundary
        .concat(prevDepth)
        .sort((a, b) => a - b)
        .slice(-2);
    }

    const length = prefix[prefix.length - 1] - prefix[leftBoundary[0]];
    const nodes = prefix.length - leftBoundary[0];
    if (length > maxLength || (length === maxLength && nodes < minNodes)) {
      maxLength = length;
      minNodes = nodes;
    }

    for (const [v, w] of graph[u]) {
      if (v === prev) {
        continue;
      }
      prefix.push(prefix[prefix.length - 1] + w);
      dfs(v, u, leftBoundary);
      prefix.pop();
    }

    lastSeenDepth.set(nums[u], prevDepth);
  };

  dfs(0, -1, [0, 0]);
  return [maxLength, minNodes];
};
