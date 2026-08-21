/**
 * Longest Special Path
 * Intuition: A special path has unique node values. Root the tree at 0 and DFS; prefix[] is the distance from the root along the current path. lastSeenDepth[value] is the prefix index of the previous same value, which clips the left boundary of the unique-value window.
 * Approach: 1. Build an undirected weighted graph. 2. DFS from 0 with prefix starting at [0]. 3. On entering u, set leftBoundary = max(old, last depth of nums[u]). 4. Path length = prefix.back - prefix[leftBoundary], nodes = prefix.size - leftBoundary. Track max length then fewest nodes. 5. Restore lastSeenDepth on exit.
 * Dry Run: A path 0-1-2 with distinct nums has length = sum of those edges and node count = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var longestSpecialPath = function (edges, nums) {
  const nodeCount = nums.length;
  const graph = Array.from({ length: nodeCount }, () => []);

  for (const [fromNode, toNode, edgeWeight] of edges) {
    graph[fromNode].push([toNode, edgeWeight]);
    graph[toNode].push([fromNode, edgeWeight]);
  }

  let maximumLength = 0;
  let minimumNodes = 1;
  const prefixDistances = [0];
  const lastSeenDepth = new Map();

  const dfs = (currentNode, parentNode, leftBoundary) => {
    const previousDepth = lastSeenDepth.get(nums[currentNode]) || 0;
    lastSeenDepth.set(nums[currentNode], prefixDistances.length);
    leftBoundary = Math.max(leftBoundary, previousDepth);

    const pathLength =
      prefixDistances[prefixDistances.length - 1] -
      prefixDistances[leftBoundary];
    const nodeCountOnPath = prefixDistances.length - leftBoundary;
    if (
      pathLength > maximumLength ||
      (pathLength === maximumLength && nodeCountOnPath < minimumNodes)
    ) {
      maximumLength = pathLength;
      minimumNodes = nodeCountOnPath;
    }

    for (const [nextNode, edgeWeight] of graph[currentNode]) {
      if (nextNode === parentNode) {
        continue;
      }
      prefixDistances.push(
        prefixDistances[prefixDistances.length - 1] + edgeWeight
      );
      dfs(nextNode, currentNode, leftBoundary);
      prefixDistances.pop();
    }

    lastSeenDepth.set(nums[currentNode], previousDepth);
  };

  dfs(0, -1, 0);
  return [maximumLength, minimumNodes];
};
