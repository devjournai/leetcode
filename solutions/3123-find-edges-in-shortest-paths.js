/**
 * Find Edges In Shortest Paths
 * Intuition: An undirected edge `u-v` of weight `w` lies on some shortest 0-to-(n-1) path iff `distFromStart[u] + w + distFromEnd[v] === distFromStart[n-1]` or the swapped orientation. Two Dijkstra runs give those distances.
 * Approach: 1. Build the undirected weighted graph. 2. Dijkstra from 0 and from n-1. 3. For each edge, mark true when either orientation concatenates to the global shortest distance. Unreachable `n-1` makes every comparison false.
 * Dry Run:
 * Input: n = 4, edges = [[2,0,1],[2,3,1],[3,1,1]]
 * 1. Shortest 0 to 3 is 2 via 0-2-3. Edges (2,0) and (2,3) are on it; (3,1) is not.
 * Time Complexity: O((n + m) log n)
 * Space Complexity: O(n + m)
 */
var findAnswer = function (n, edges) {
  const UNREACHABLE_DISTANCE = 1000000000;
  const adjacencyList = Array.from({ length: n }, () => []);
  for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
    const fromNode = edges[edgeIndex][0];
    const toNode = edges[edgeIndex][1];
    const edgeWeight = edges[edgeIndex][2];
    adjacencyList[fromNode].push([toNode, edgeWeight]);
    adjacencyList[toNode].push([fromNode, edgeWeight]);
  }

  const dijkstraFrom = (sourceNode) => {
    const distanceFromSource = new Array(n).fill(UNREACHABLE_DISTANCE);
    distanceFromSource[sourceNode] = 0;
    const distanceMinHeap = new PriorityQueue(
      (stateA, stateB) => stateA[0] - stateB[0]
    );
    distanceMinHeap.enqueue([0, sourceNode]);

    while (!distanceMinHeap.isEmpty()) {
      const [currentDistance, currentNode] = distanceMinHeap.dequeue();
      if (currentDistance > distanceFromSource[currentNode]) {
        continue;
      }
      const neighbors = adjacencyList[currentNode];
      for (
        let neighborIndex = 0;
        neighborIndex < neighbors.length;
        neighborIndex++
      ) {
        const nextNode = neighbors[neighborIndex][0];
        const weight = neighbors[neighborIndex][1];
        const candidateDistance = currentDistance + weight;
        if (candidateDistance < distanceFromSource[nextNode]) {
          distanceFromSource[nextNode] = candidateDistance;
          distanceMinHeap.enqueue([candidateDistance, nextNode]);
        }
      }
    }

    return distanceFromSource;
  };

  const distanceFromStart = dijkstraFrom(0);
  const distanceFromEnd = dijkstraFrom(n - 1);
  const shortestPathLength = distanceFromStart[n - 1];
  const isEdgeOnShortestPath = new Array(edges.length).fill(false);

  for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
    const fromNode = edges[edgeIndex][0];
    const toNode = edges[edgeIndex][1];
    const edgeWeight = edges[edgeIndex][2];
    isEdgeOnShortestPath[edgeIndex] =
      distanceFromStart[fromNode] + edgeWeight + distanceFromEnd[toNode] ===
        shortestPathLength ||
      distanceFromStart[toNode] + edgeWeight + distanceFromEnd[fromNode] ===
        shortestPathLength;
  }

  return isEdgeOnShortestPath;
};
