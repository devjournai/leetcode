/**
 * Divide Nodes Into The Maximum Number Of Groups
 * Intuition: The condition |y - x| = 1 for adjacent nodes implies that the graph is bipartite, and nodes can be assigned group numbers representing their distance from an arbitrary starting node within a connected component. The maximum number of groups for a component is determined by its diameter + 1. We must run a BFS from every node in each connected component to find the maximum possible depth, ensuring the bipartite property holds.
 * Approach: 1. Construct an adjacency list for the graph. 2. Initialize an array to store the maximum group count for each connected component, identified by its smallest node index. 3. Iterate through each node from 0 to n-1. For each node, perform a Breadth-First Search (BFS). 4. During the BFS, assign group numbers (distances + 1) to unvisited nodes and keep track of the maximum group number reached in the current BFS. 5. If an already visited neighbor's group number does not satisfy the |y - x| = 1 condition, return -1 as it's impossible to group the nodes. 6. Keep track of the smallest node index encountered in the current connected component (this will be the canonical root for that component). 7. After each BFS completes, update the maximum group count for the identified component root. 8. Finally, sum up all the maximum group counts stored for each distinct connected component.
 * Dry Run: n = 3, edges = [[1,2],[2,3]]
 * Initial:
 *   graphAdjacency = [[], [], []]
 *   componentMaxDepths = [0, 0, 0]
 *
 * Graph Construction (edges):
 *   edgePointer = 0, currentEdge = [1,2], nodeValueA = 0, nodeValueB = 1
 *     graphAdjacency[0] = [1], graphAdjacency[1] = [0]
 *   edgePointer = 1, currentEdge = [2,3], nodeValueA = 1, nodeValueB = 2
 *     graphAdjacency[1] = [0, 2], graphAdjacency[2] = [1]
 *   Final graphAdjacency = [[1], [0, 2], [1]]
 *
 * Iterate startNodeIndex (outer loop):
 * startNodeIndex = 0:
 *   nodeDistances = [0, 0, 0]
 *   bfsProcessQueue = [0]
 *   currentIterationMaxGroups = 1
 *   discoveredComponentRoot = 0
 *   nodeDistances[0] = 1 (nodeDistances: [1, 0, 0])
 *
 *   BFS for startNodeIndex 0:
 *     queueNextPointer = 0, activeNode = 0, discoveredComponentRoot = 0
 *       neighborsOfActiveNode = [1]
 *       neighborIndex = 0, currentNeighbor = 1:
 *         nodeDistances[1] is 0 -> nodeDistances[1] = nodeDistances[0] + 1 = 2 (nodeDistances: [1, 2, 0])
 *         currentIterationMaxGroups = max(1, 2) = 2
 *         bfsProcessQueue.push(1) (bfsProcessQueue: [0, 1])
 *     queueNextPointer = 1, activeNode = 1, discoveredComponentRoot = 0
 *       neighborsOfActiveNode = [0, 2]
 *       neighborIndex = 0, currentNeighbor = 0:
 *         nodeDistances[0] is 1, abs(nodeDistances[0] - nodeDistances[1]) = abs(1 - 2) = 1. OK.
 *       neighborIndex = 1, currentNeighbor = 2:
 *         nodeDistances[2] is 0 -> nodeDistances[2] = nodeDistances[1] + 1 = 3 (nodeDistances: [1, 2, 3])
 *         currentIterationMaxGroups = max(2, 3) = 3
 *         bfsProcessQueue.push(2) (bfsProcessQueue: [0, 1, 2])
 *     queueNextPointer = 2, activeNode = 2, discoveredComponentRoot = 0
 *       neighborsOfActiveNode = [1]
 *       neighborIndex = 0, currentNeighbor = 1:
 *         nodeDistances[1] is 2, abs(nodeDistances[1] - nodeDistances[2]) = abs(2 - 3) = 1. OK.
 *     BFS ends.
 *   componentMaxDepths[0] = max(componentMaxDepths[0], currentIterationMaxGroups) = max(0, 3) = 3.
 *   componentMaxDepths: [3, 0, 0]
 *
 * startNodeIndex = 1: (Similar BFS starts, but discoveredComponentRoot becomes 0. Max groups remain 3 for component 0).
 *   discoveredComponentRoot for this BFS becomes 0.
 *   currentIterationMaxGroups will be 2 (max distance from node 1 is 1-0 and 1-2, both are 2 groups).
 *   componentMaxDepths[0] = max(3, 2) = 3.
 *   componentMaxDepths: [3, 0, 0]
 *
 * startNodeIndex = 2: (Similar BFS starts, but discoveredComponentRoot becomes 0. Max groups remain 3 for component 0).
 *   discoveredComponentRoot for this BFS becomes 0.
 *   currentIterationMaxGroups will be 3 (max distance from node 2 is 2-1-0, which is 3 groups).
 *   componentMaxDepths[0] = max(3, 3) = 3.
 *   componentMaxDepths: [3, 0, 0]
 *
 * Summing results:
 * totalMaximumGroups = 0
 * componentResultIndex = 0: totalMaximumGroups = 0 + componentMaxDepths[0] = 3
 * componentResultIndex = 1: totalMaximumGroups = 3 + componentMaxDepths[1] = 3 + 0 = 3
 * componentResultIndex = 2: totalMaximumGroups = 3 + componentMaxDepths[2] = 3 + 0 = 3
 *
 * Return 3.
 * Time Complexity: O(N * (N + E))
 * Space Complexity: O(N + E)
 */
var magnificentSets = function (n, edges) {
  const graphAdjacency = new Array(n).fill(0).map(() => []);
  for (let edgePointer = 0; edgePointer < edges.length; edgePointer++) {
    const currentEdge = edges[edgePointer];
    const nodeValueA = currentEdge[0] - 1;
    const nodeValueB = currentEdge[1] - 1;
    graphAdjacency[nodeValueA].push(nodeValueB);
    graphAdjacency[nodeValueB].push(nodeValueA);
  }

  const componentMaxDepths = new Array(n).fill(0);

  for (let startNodeIndex = 0; startNodeIndex < n; startNodeIndex++) {
    const nodeDistances = new Array(n).fill(0);
    const bfsProcessQueue = [startNodeIndex];
    let currentIterationMaxGroups = 1;
    let discoveredComponentRoot = startNodeIndex;

    nodeDistances[startNodeIndex] = 1;

    let queueNextPointer = 0;
    while (queueNextPointer < bfsProcessQueue.length) {
      const activeNode = bfsProcessQueue[queueNextPointer];
      queueNextPointer++;

      discoveredComponentRoot = Math.min(discoveredComponentRoot, activeNode);

      const neighborsOfActiveNode = graphAdjacency[activeNode];
      for (
        let neighborIndex = 0;
        neighborIndex < neighborsOfActiveNode.length;
        neighborIndex++
      ) {
        const currentNeighbor = neighborsOfActiveNode[neighborIndex];

        if (nodeDistances[currentNeighbor] === 0) {
          nodeDistances[currentNeighbor] = nodeDistances[activeNode] + 1;
          currentIterationMaxGroups = Math.max(
            currentIterationMaxGroups,
            nodeDistances[currentNeighbor]
          );
          bfsProcessQueue.push(currentNeighbor);
        } else if (
          Math.abs(
            nodeDistances[currentNeighbor] - nodeDistances[activeNode]
          ) !== 1
        ) {
          return -1;
        }
      }
    }

    componentMaxDepths[discoveredComponentRoot] = Math.max(
      componentMaxDepths[discoveredComponentRoot],
      currentIterationMaxGroups
    );
  }

  let totalMaximumGroups = 0;
  for (
    let componentResultIndex = 0;
    componentResultIndex < n;
    componentResultIndex++
  ) {
    totalMaximumGroups += componentMaxDepths[componentResultIndex];
  }

  return totalMaximumGroups;
};
