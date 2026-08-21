/**
 * Minimize the Maximum Edge Weight of Graph
 * Intuition: After dropping heavy edges we need every node to reach 0. Reverse the edges and ask whether 0 can reach everyone. Binary search the max allowed weight. Out-degree `threshold` is ≥1 in valid trees so connectivity dominates.
 * Approach: 1. Build reversed adjacency lists. 2. Binary search m in [1, 1e6]. 3. BFS from 0 using only reversed edges with weight ≤ m. 4. If we can visit n nodes, try a smaller m; else increase. 5. If even 1e6 fails, return -1.
 * Dry Run: n=5, edges to 0 with weights 1,2,3. Binary search finds 3 if that is the heaviest needed to connect all.
 * Time Complexity: O((N + E) log W)
 * Space Complexity: O(N + E)
 */

var minMaxWeight = function (n, edges, threshold) {
  const MAXIMUM_WEIGHT = 1000000;
  const reversedGraph = Array.from({ length: n }, () => []);

  for (const [fromNode, toNode, edgeWeight] of edges) {
    reversedGraph[toNode].push([fromNode, edgeWeight]);
  }

  const reachableCount = (maxAllowedWeight) => {
    const visited = new Array(n).fill(false);
    const nodeQueue = [0];
    let queueHead = 0;
    visited[0] = true;
    let visitedCount = 1;

    while (queueHead < nodeQueue.length) {
      const currentNode = nodeQueue[queueHead++];
      for (const [nextNode, edgeWeight] of reversedGraph[currentNode]) {
        if (edgeWeight > maxAllowedWeight || visited[nextNode]) {
          continue;
        }
        visited[nextNode] = true;
        visitedCount++;
        nodeQueue.push(nextNode);
      }
    }

    return visitedCount;
  };

  let low = 1;
  let high = MAXIMUM_WEIGHT + 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (reachableCount(mid) === n) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  void threshold;
  return low === MAXIMUM_WEIGHT + 1 ? -1 : low;
};
