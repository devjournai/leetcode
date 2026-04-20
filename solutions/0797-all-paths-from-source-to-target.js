/**
 * All Paths From Source To Target
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var allPathsSourceTarget = function (graph) {
  const finalDestination = graph.length - 1;
  const allCollectedPaths = [];

  const dfsExplore = (currentNode, currentRoute) => {
    if (currentNode === finalDestination) {
      allCollectedPaths.push([...currentRoute]);
      return;
    }

    const neighborsList = graph[currentNode];
    for (const connectedNode of neighborsList) {
      currentRoute.push(connectedNode);
      dfsExplore(connectedNode, currentRoute);
      currentRoute.pop();
    }
  };

  dfsExplore(0, [0]);
  return allCollectedPaths;
};
