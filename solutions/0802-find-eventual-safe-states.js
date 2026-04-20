/**
 * Find Eventual Safe States
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
