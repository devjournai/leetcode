/**
 * Minimum Time To Visit Disappearing Nodes
 * Intuition: Nodes vanish at `disappear[i]`, so a path is valid only if it arrives strictly before that time. Shortest paths with non-negative edge weights are Dijkstra from node 0, rejecting any relaxation that would land at time `>= disappear[v]`.
 * Approach: 1. Build an undirected weighted adjacency list. 2. Run Dijkstra from 0 with a min-heap of `(distance, node)`. 3. Relax neighbor `v` only when `distance[u] + weight < disappear[v]` and it improves `distance[v]`. 4. Unreachable nodes (still Infinity) become -1.
 * Dry Run:
 * Input: n = 3, edges = [[0,1,2],[1,2,1],[0,2,4]], disappear = [1,1,5]
 * 1. Node 0 at time 0 (0 < 1)
 * 2. Edge 0->1 cost 2 but 2 >= disappear[1]=1, skip. Edge 0->2 cost 4, 4 < 5, dist[2]=4
 * 3. Answer: [0,-1,4]
 * Time Complexity: O((n + m) log n)
 * Space Complexity: O(n + m)
 */
var minimumTime = function (n, edges, disappear) {
  const adjacencyList = Array.from({ length: n }, () => []);
  for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
    const fromNode = edges[edgeIndex][0];
    const toNode = edges[edgeIndex][1];
    const travelTime = edges[edgeIndex][2];
    adjacencyList[fromNode].push([toNode, travelTime]);
    adjacencyList[toNode].push([fromNode, travelTime]);
  }

  const shortestArrivalTime = new Array(n).fill(Number.POSITIVE_INFINITY);
  shortestArrivalTime[0] = 0;
  const travelMinHeap = new PriorityQueue(
    (stateA, stateB) => stateA[0] - stateB[0],
  );
  travelMinHeap.enqueue([0, 0]);

  while (!travelMinHeap.isEmpty()) {
    const [arrivalTime, currentNode] = travelMinHeap.dequeue();
    if (arrivalTime > shortestArrivalTime[currentNode]) {
      continue;
    }
    const neighbors = adjacencyList[currentNode];
    for (
      let neighborIndex = 0;
      neighborIndex < neighbors.length;
      neighborIndex++
    ) {
      const nextNode = neighbors[neighborIndex][0];
      const edgeWeight = neighbors[neighborIndex][1];
      const candidateArrival = arrivalTime + edgeWeight;
      if (
        candidateArrival < disappear[nextNode] &&
        candidateArrival < shortestArrivalTime[nextNode]
      ) {
        shortestArrivalTime[nextNode] = candidateArrival;
        travelMinHeap.enqueue([candidateArrival, nextNode]);
      }
    }
  }

  const visitTimes = new Array(n);
  for (let nodeIndex = 0; nodeIndex < n; nodeIndex++) {
    visitTimes[nodeIndex] =
      shortestArrivalTime[nodeIndex] === Number.POSITIVE_INFINITY
        ? -1
        : shortestArrivalTime[nodeIndex];
  }
  return visitTimes;
};
