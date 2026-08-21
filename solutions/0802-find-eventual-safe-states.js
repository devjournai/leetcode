/**
 * Find Eventual Safe States
 * Intuition: Safe nodes never reach a cycle. Terminals have out-degree 0; reversing edges, Kahn from terminals peels nodes whose remaining out-degree hits 0.
 * Approach: 1. Build `reversedAdjacencyList` and `initialOutDegrees`. 2. Queue all out-degree 0. 3. Pop, record as safe, decrement predecessors, enqueue when 0. 4. Sort ids and return.
 * Dry Run: graph = [[1,2],[2,3],[5],[0],[5],[],[]]. Terminals 5,6 peel to safe [2,4,5,6] after sort.
 * Time Complexity: O(N + E + N log N)
 * Space Complexity: O(N + E)
 */
var eventualSafeNodes = function (graph) {
  const graphSize = graph.length;
  const initialOutDegrees = new Array(graphSize).fill(0);
  const reversedAdjacencyList = new Array(graphSize).fill(0).map(() => []);

  for (let currentVertex = 0; currentVertex < graphSize; currentVertex++) {
    for (let nextVertex of graph[currentVertex]) {
      reversedAdjacencyList[nextVertex].push(currentVertex);
      initialOutDegrees[currentVertex]++;
    }
  }

  const processingQueue = [];
  for (let nodeIdentifier = 0; nodeIdentifier < graphSize; nodeIdentifier++) {
    if (initialOutDegrees[nodeIdentifier] === 0) {
      processingQueue.push(nodeIdentifier);
    }
  }

  const safeNodesCollection = [];
  while (processingQueue.length > 0) {
    const processedNode = processingQueue.shift();
    safeNodesCollection.push(processedNode);

    for (let predecessorNode of reversedAdjacencyList[processedNode]) {
      initialOutDegrees[predecessorNode]--;
      if (initialOutDegrees[predecessorNode] === 0) {
        processingQueue.push(predecessorNode);
      }
    }
  }

  safeNodesCollection.sort((valueA, valueB) => valueA - valueB);
  return safeNodesCollection;
};
