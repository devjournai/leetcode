/**
 * All Paths From Source To Target
 * Intuition: DAG from 0 to n-1; DFS every neighbor, copy the path when the node is n-1, then backtrack.
 * Approach: 1. `finalDestination = graph.length-1`. 2. `dfsExplore` copies `currentRoute` on arrival. 3. Push neighbor, recurse, pop. 4. Start at `dfsExplore(0, [0])`.
 * Dry Run: graph = [[1,2],[3],[3],[]]. Paths 0-1-3 and 0-2-3.
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
