/**
 * Reachable Nodes With Restrictions
 * Intuition: To find the number of reachable nodes from a starting node (node 0) while avoiding a specific set of restricted nodes in a graph, a graph traversal algorithm such as Depth-First Search (DFS) or Breadth-First Search (BFS) is ideal. We need to explore paths starting from node 0, ensuring that any node encountered is neither in the restricted set nor already visited, to count unique reachable nodes.
 * Approach: 1. Build an adjacency list representation of the graph from the given `edges` array. 2. Create a `Set` to store all `restricted` nodes for efficient `O(1)` lookup during traversal. 3. Initialize another `Set` to keep track of all `visited` nodes during the DFS traversal. 4. Define a recursive helper function for Depth-First Search (`depthFirstSearch`). This function takes a `currentNodeIdentifier` as input. 5. Inside `depthFirstSearch`, first check if the `currentNodeIdentifier` is present in the `restrictedNodeLookup` set or the `visitedTracker` set. If either is true, the traversal path along this node is terminated, and the function returns. 6. If the node is neither restricted nor visited, mark it as visited by adding it to `visitedTracker`. 7. Then, iterate through all neighbors of the `currentNodeIdentifier` using the `adjacencyList` and recursively call `depthFirstSearch` for each neighbor. 8. Finally, initiate the DFS traversal by calling `depthFirstSearch(0)`. The total number of reachable, unrestricted nodes will be the final size of the `visitedTracker` set.
 * Dry Run:
 *   n = 7, edges = [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]], restricted = [4,6]
 *   1. `adjacencyList` initialized: An array of 7 empty arrays.
 *      `adjacencyList[0] = []`, `adjacencyList[1] = []`, ...
 *   2. Populate `adjacencyList` from `edges`:
 *      0: [1, 4, 5], 1: [0, 2, 3], 2: [1], 3: [1], 4: [0], 5: [0, 6], 6: [5]
 *   3. `restrictedNodeLookup` initialized: `Set {4, 6}`.
 *   4. `visitedTracker` initialized: `Set {}`.
 *   5. Call `depthFirstSearch(0)`:
 *      - `currentNodeIdentifier = 0`:
 *          - Not restricted (4 or 6), not visited.
 *          - Add 0 to `visitedTracker`. `visitedTracker` = `{0}`.
 *          - Neighbors of 0: [1, 4, 5]
 *          - Call `depthFirstSearch(1)`:
 *              - `currentNodeIdentifier = 1`:
 *                  - Not restricted, not visited.
 *                  - Add 1 to `visitedTracker`. `visitedTracker` = `{0, 1}`.
 *                  - Neighbors of 1: [0, 2, 3]
 *                  - Call `depthFirstSearch(0)`: `visitedTracker` has 0. Returns.
 *                  - Call `depthFirstSearch(2)`:
 *                      - `currentNodeIdentifier = 2`:
 *                          - Not restricted, not visited.
 *                          - Add 2 to `visitedTracker`. `visitedTracker` = `{0, 1, 2}`.
 *                          - Neighbors of 2: [1]
 *                          - Call `depthFirstSearch(1)`: `visitedTracker` has 1. Returns.
 *                      - Returns from `depthFirstSearch(2)`.
 *                  - Call `depthFirstSearch(3)`:
 *                      - `currentNodeIdentifier = 3`:
 *                          - Not restricted, not visited.
 *                          - Add 3 to `visitedTracker`. `visitedTracker` = `{0, 1, 2, 3}`.
 *                          - Neighbors of 3: [1]
 *                          - Call `depthFirstSearch(1)`: `visitedTracker` has 1. Returns.
 *                      - Returns from `depthFirstSearch(3)`.
 *              - Returns from `depthFirstSearch(1)`.
 *          - Call `depthFirstSearch(4)`:
 *              - `currentNodeIdentifier = 4`: Is in `restrictedNodeLookup`. Returns.
 *          - Call `depthFirstSearch(5)`:
 *              - `currentNodeIdentifier = 5`:
 *                  - Not restricted, not visited.
 *                  - Add 5 to `visitedTracker`. `visitedTracker` = `{0, 1, 2, 3, 5}`.
 *                  - Neighbors of 5: [0, 6]
 *                  - Call `depthFirstSearch(0)`: `visitedTracker` has 0. Returns.
 *                  - Call `depthFirstSearch(6)`: Is in `restrictedNodeLookup`. Returns.
 *              - Returns from `depthFirstSearch(5)`.
 *      - Returns from `depthFirstSearch(0)`.
 *   6. The final size of `visitedTracker` is 5.
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var reachableNodes = function (n, edges, restricted) {
  const adjacencyList = Array(n)
    .fill()
    .map((_val, currentIdx) => []);

  for (let edgeIndex = 0; edgeIndex < edges.length; ++edgeIndex) {
    const nodeA = edges[edgeIndex][0];
    const nodeB = edges[edgeIndex][1];
    adjacencyList[nodeA].push(nodeB);
    adjacencyList[nodeB].push(nodeA);
  }

  const restrictedNodeLookup = new Set();
  for (
    let restrictedIndex = 0;
    restrictedIndex < restricted.length;
    ++restrictedIndex
  ) {
    const restrictedValue = restricted[restrictedIndex];
    restrictedNodeLookup.add(restrictedValue);
  }

  const visitedTracker = new Set();

  const depthFirstSearch = (currentNodeIdentifier) => {
    if (restrictedNodeLookup.has(currentNodeIdentifier)) {
      return;
    }
    if (visitedTracker.has(currentNodeIdentifier)) {
      return;
    }

    visitedTracker.add(currentNodeIdentifier);

    const currentNeighbors = adjacencyList[currentNodeIdentifier];
    for (
      let neighborIndex = 0;
      neighborIndex < currentNeighbors.length;
      ++neighborIndex
    ) {
      const adjacentNodeIdentifier = currentNeighbors[neighborIndex];
      depthFirstSearch(adjacentNodeIdentifier);
    }
  };

  depthFirstSearch(0);

  return visitedTracker.size;
};
