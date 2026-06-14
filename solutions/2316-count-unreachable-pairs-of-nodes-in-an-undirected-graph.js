/**
 * Count Unreachable Pairs Of Nodes In An Undirected Graph
 * Intuition: Unreachable pairs exist between nodes in different connected components. By finding the size of each component, we can calculate the total number of pairs where one node is from a discovered component and the other from any previously discovered components.
 * Approach: 1. Construct an adjacency list representation of the graph. 2. Initialize a boolean array to track visited nodes. 3. Initialize a variable for the total count of unreachable pairs and a variable to accumulate the count of nodes from all previously visited components. 4. Iterate through each node from 0 to n-1. 5. If a node has not been visited, it signifies the start of a new connected component. Perform a Depth First Search (DFS) starting from this node to find all nodes in its component and count its size. 6. Add the product of the current component's size and the accumulated count of nodes from previous components to the total unreachable pairs. 7. Update the accumulated node count by adding the current component's size. 8. Return the total count of unreachable pairs after iterating through all nodes.
 * Dry Run: n = 3, edges = [[0, 1]]
 * 1. graphConnections = [[1], [0], []]
 * 2. visitedNodesTracker = [F, F, F]
 * 3. totalPairCount = 0, nodesAccumulated = 0
 * 4. vertexIndex = 0:
 *    a. !visitedNodesTracker[0] is true.
 *    b. Call depthFirstSearch(0):
 *       i. startingNodeIdentifier = 0. visitedNodesTracker[0] = T. currentComponentSize = 1.
 *       ii. For neighborIdentifier = 1 (from graphConnections[0]):
 *           1. Call depthFirstSearch(1):
 *              a. startingNodeIdentifier = 1. visitedNodesTracker[1] = T. currentComponentSize = 1.
 *              b. For neighborIdentifier = 0 (from graphConnections[1]):
 *                 i. Call depthFirstSearch(0): visitedNodesTracker[0] is T. Returns 0.
 *              c. currentComponentSize becomes 1 + 0 = 1. Returns 1.
 *       iii. currentComponentSize becomes 1 + 1 = 2. Returns 2.
 *    c. componentSizeFound = 2.
 *    d. totalPairCount = 0 + (2 * 0) = 0.
 *    e. nodesAccumulated = 0 + 2 = 2.
 *    f. visitedNodesTracker = [T, T, F].
 * 5. vertexIndex = 1:
 *    a. !visitedNodesTracker[1] is false. Skip.
 * 6. vertexIndex = 2:
 *    a. !visitedNodesTracker[2] is true.
 *    b. Call depthFirstSearch(2):
 *       i. startingNodeIdentifier = 2. visitedNodesTracker[2] = T. currentComponentSize = 1.
 *       ii. No neighbors for node 2. Returns 1.
 *    c. componentSizeFound = 1.
 *    d. totalPairCount = 0 + (1 * 2) = 2.
 *    e. nodesAccumulated = 2 + 1 = 3.
 *    f. visitedNodesTracker = [T, T, T].
 * 7. Loop finishes. Return totalPairCount = 2.
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var countPairs = function (n, edges) {
  const graphConnections = Array.from({ length: n }, () => []);
  for (const currentEdge of edges) {
    const nodeA = currentEdge[0];
    const nodeB = currentEdge[1];
    graphConnections[nodeA].push(nodeB);
    graphConnections[nodeB].push(nodeA);
  }

  const visitedNodesTracker = new Array(n).fill(false);
  let totalPairCount = 0;
  let nodesAccumulated = 0;

  const depthFirstSearch = (startingNodeIdentifier) => {
    if (visitedNodesTracker[startingNodeIdentifier]) {
      return 0;
    }
    visitedNodesTracker[startingNodeIdentifier] = true;
    let currentComponentSize = 1;
    for (const neighborIdentifier of graphConnections[startingNodeIdentifier]) {
      currentComponentSize += depthFirstSearch(neighborIdentifier);
    }
    return currentComponentSize;
  };

  for (let vertexIndex = 0; vertexIndex < n; vertexIndex++) {
    if (!visitedNodesTracker[vertexIndex]) {
      const componentSizeFound = depthFirstSearch(vertexIndex);
      totalPairCount += componentSizeFound * nodesAccumulated;
      nodesAccumulated += componentSizeFound;
    }
  }

  return totalPairCount;
};
