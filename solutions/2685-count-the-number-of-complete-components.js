/**
 * Count the Number of Complete Components
 * Intuition: A connected component is complete if every vertex within the component is connected to every other vertex in that same component. This implies that for a component with `k` vertices, each vertex must have exactly `k-1` neighbors, and all these neighbors must also be part of the same component.
 * Approach: 1. Build an adjacency list representation of the graph to efficiently query neighbors. 2. Iterate through all vertices, and for each unvisited vertex, perform a Breadth-First Search (BFS) to find all nodes belonging to its connected component. During the BFS, mark visited nodes globally. 3. For each identified connected component, check if it's complete. A component is complete if, for every vertex in the component, its degree in the original graph is equal to `(component_size - 1)`, and all its neighbors are also within this component. 4. Increment a counter for each complete component found.
 * Dry Run:
 *   n = 5, edges = [[0,1],[1,2],[2,0], [3,4]]
 *
 *   1. Initialize:
 *      - adjacencyStructure: [Set(), Set(), Set(), Set(), Set()]
 *      - visitedGlobalNodes: Set()
 *      - totalCompleteComponents: 0
 *
 *   2. Build adjacencyStructure:
 *      - [0,1]: adjacencyStructure[0].add(1), adjacencyStructure[1].add(0)
 *      - [1,2]: adjacencyStructure[1].add(2), adjacencyStructure[2].add(1)
 *      - [2,0]: adjacencyStructure[2].add(0), adjacencyStructure[0].add(2)
 *      - [3,4]: adjacencyStructure[3].add(4), adjacencyStructure[4].add(3)
 *      Resulting adjacencyStructure:
 *          0: {1, 2}
 *          1: {0, 2}
 *          2: {0, 1}
 *          3: {4}
 *          4: {3}
 *
 *   3. Loop initialVertex from 0 to 4:
 *
 *      - initialVertex = 0:
 *          - 0 is not in visitedGlobalNodes.
 *          - Call traverseComponent(0):
 *              - currentExploredComponent: {0, 1, 2} (BFS explores 0 -> 1, 0 -> 2; then from 1, finds 0,2 already visited; from 2, finds 0,1 already visited).
 *              - visitedGlobalNodes: {0, 1, 2}
 *              - Returns {0, 1, 2}
 *          - Call verifyCompleteness({0, 1, 2}):
 *              - componentNodeCount = 3. Expected degree = 2.
 *              - Vertex 0: degree=2 ({1,2}), neighbors {1,2} are in component. True.
 *              - Vertex 1: degree=2 ({0,2}), neighbors {0,2} are in component. True.
 *              - Vertex 2: degree=2 ({0,1}), neighbors {0,1} are in component. True.
 *              - All vertices satisfy. Returns true.
 *          - totalCompleteComponents becomes 1.
 *
 *      - initialVertex = 1: 1 is in visitedGlobalNodes. Skip.
 *      - initialVertex = 2: 2 is in visitedGlobalNodes. Skip.
 *
 *      - initialVertex = 3:
 *          - 3 is not in visitedGlobalNodes.
 *          - Call traverseComponent(3):
 *              - currentExploredComponent: {3, 4} (BFS explores 3 -> 4; then from 4, finds 3 already visited).
 *              - visitedGlobalNodes: {0, 1, 2, 3, 4}
 *              - Returns {3, 4}
 *          - Call verifyCompleteness({3, 4}):
 *              - componentNodeCount = 2. Expected degree = 1.
 *              - Vertex 3: degree=1 ({4}), neighbor {4} is in component. True.
 *              - Vertex 4: degree=1 ({3}), neighbor {3} is in component. True.
 *              - All vertices satisfy. Returns true.
 *          - totalCompleteComponents becomes 2.
 *
 *      - initialVertex = 4: 4 is in visitedGlobalNodes. Skip.
 *
 *   4. Loop finishes. Return totalCompleteComponents (2).
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var countCompleteComponents = function (n, edges) {
  const adjacencyStructure = Array.from({ length: n }, () => new Set());
  edges.forEach((edgeData) => {
    const firstNode = edgeData[0];
    const secondNode = edgeData[1];
    adjacencyStructure[firstNode].add(secondNode);
    adjacencyStructure[secondNode].add(firstNode);
  });

  const visitedGlobalNodes = new Set();
  let totalCompleteComponents = 0;

  const traverseComponent = (currentNodeId) => {
    const currentExploredComponent = new Set([currentNodeId]);
    const bfsQueue = [currentNodeId];
    visitedGlobalNodes.add(currentNodeId);

    while (bfsQueue.length > 0) {
      const activeNode = bfsQueue.shift();
      adjacencyStructure[activeNode].forEach((adjacentNode) => {
        if (!visitedGlobalNodes.has(adjacentNode)) {
          currentExploredComponent.add(adjacentNode);
          bfsQueue.push(adjacentNode);
          visitedGlobalNodes.add(adjacentNode);
        }
      });
    }
    return currentExploredComponent;
  };

  const verifyCompleteness = (potentialComponent) => {
    const componentNodeCount = potentialComponent.size;
    return [...potentialComponent].every((componentVertex) => {
      if (adjacencyStructure[componentVertex].size !== componentNodeCount - 1) {
        return false;
      }
      return [...adjacencyStructure[componentVertex]].every((connectedPeer) =>
        potentialComponent.has(connectedPeer),
      );
    });
  };

  for (let initialVertex = 0; initialVertex < n; initialVertex++) {
    if (!visitedGlobalNodes.has(initialVertex)) {
      const currentComp = traverseComponent(initialVertex);
      if (verifyCompleteness(currentComp)) {
        totalCompleteComponents++;
      }
    }
  }

  return totalCompleteComponents;
};
