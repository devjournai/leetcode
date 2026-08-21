/**
 * Longest Cycle In A Graph
 * Intuition: A functional graph (each node has at most one outgoing edge) consists of components where paths eventually lead to a cycle or a dead end. We can detect cycles and their lengths by performing a depth-first search (DFS) from each unvisited node, tracking the state of nodes during traversal (unvisited, visiting, visited) and their discovery depths within the current path.
 * Approach: 1. Initialize `maximumCycleLength` to -1. 2. Create `nodeVisitationStates` array to track nodes (0: unvisited, 1: visiting, 2: visited) and `nodeDiscoveryDepths` array to store the depth at which a node was encountered in the current DFS path. 3. Iterate through all nodes from `0` to `n-1`. If a node is unvisited, start a DFS from it. 4. In the DFS function `traverseForCycles(currentNodeIdentifier, currentPathDepth)`: a. If `currentNodeIdentifier` is already fully `visited` (state 2), return. b. If `currentNodeIdentifier` is currently `visiting` (state 1), a cycle is detected. Calculate its length as `currentPathDepth - nodeDiscoveryDepths[currentNodeIdentifier]` and update `maximumCycleLength`. Then return. c. Otherwise (node is `unvisited`), mark it as `visiting` (state 1), record its `currentPathDepth` in `nodeDiscoveryDepths`, and recursively call `traverseForCycles` for its successor (`edges[currentNodeIdentifier]`) if it exists. d. After the recursive call returns, mark `currentNodeIdentifier` as fully `visited` (state 2). 5. After iterating through all starting nodes, return `maximumCycleLength`.
 * Dry Run: Input: `edges = [3, 3, 4, 2, 3]`. `numberOfNodes = 5`. `maximumCycleLength = -1`. `nodeVisitationStates = [0,0,0,0,0]`. `nodeDiscoveryDepths = [0,0,0,0,0]`.
 *   - Outer loop `currentStartNode = 0`: `nodeVisitationStates[0]` is `0`. Call `traverseForCycles(0, 0)`.
 *     - `currentNodeIdentifier = 0`, `currentPathDepth = 0`. Set `nodeVisitationStates[0] = 1`, `nodeDiscoveryDepths[0] = 0`.
 *     - Next is `edges[0] = 3`. Call `traverseForCycles(3, 1)`.
 *       - `currentNodeIdentifier = 3`, `currentPathDepth = 1`. Set `nodeVisitationStates[3] = 1`, `nodeDiscoveryDepths[3] = 1`.
 *       - Next is `edges[3] = 2`. Call `traverseForCycles(2, 2)`.
 *         - `currentNodeIdentifier = 2`, `currentPathDepth = 2`. Set `nodeVisitationStates[2] = 1`, `nodeDiscoveryDepths[2] = 2`.
 *         - Next is `edges[2] = 4`. Call `traverseForCycles(4, 3)`.
 *           - `currentNodeIdentifier = 4`, `currentPathDepth = 3`. Set `nodeVisitationStates[4] = 1`, `nodeDiscoveryDepths[4] = 3`.
 *           - Next is `edges[4] = 3`. Call `traverseForCycles(3, 4)`.
 *             - `currentNodeIdentifier = 3`, `currentPathDepth = 4`. `nodeVisitationStates[3]` is `1` (visiting). Cycle detected!
 *             - `cycleLength = currentPathDepth - nodeDiscoveryDepths[3] = 4 - 1 = 3`.
 *             - `maximumCycleLength = Math.max(-1, 3) = 3`. Return.
 *           - Mark `nodeVisitationStates[4] = 2`. Return.
 *         - Mark `nodeVisitationStates[2] = 2`. Return.
 *       - Mark `nodeVisitationStates[3] = 2`. Return.
 *     - Mark `nodeVisitationStates[0] = 2`. Return.
 *   - Current state: `maximumCycleLength = 3`, `nodeVisitationStates = [2,0,2,2,2]`.
 *   - Outer loop `currentStartNode = 1`: `nodeVisitationStates[1]` is `0`. Call `traverseForCycles(1, 0)`.
 *     - `currentNodeIdentifier = 1`, `currentPathDepth = 0`. Set `nodeVisitationStates[1] = 1`, `nodeDiscoveryDepths[1] = 0`.
 *     - Next is `edges[1] = 3`. Call `traverseForCycles(3, 1)`.
 *       - `currentNodeIdentifier = 3`, `currentPathDepth = 1`. `nodeVisitationStates[3]` is `2` (visited). Return.
 *     - Mark `nodeVisitationStates[1] = 2`. Return.
 *   - Current state: `maximumCycleLength = 3`, `nodeVisitationStates = [2,2,2,2,2]`.
 *   - Outer loops for `currentStartNode = 2, 3, 4`: Nodes are already `visited` (state 2), so skip.
 *   - Return `maximumCycleLength = 3`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var longestCycle = function (edges) {
  const numberOfNodes = edges.length;
  let maximumCycleLength = -1;
  const nodeVisitationStates = new Array(numberOfNodes).fill(0);
  const nodeDiscoveryDepths = new Array(numberOfNodes).fill(0);

  for (
    let currentStartNode = 0;
    currentStartNode < numberOfNodes;
    currentStartNode++
  ) {
    if (nodeVisitationStates[currentStartNode] === 0) {
      traverseForCycles(currentStartNode, 0);
    }
  }

  function traverseForCycles(currentNodeIdentifier, currentPathDepth) {
    if (nodeVisitationStates[currentNodeIdentifier] === 2) {
      return;
    }

    if (nodeVisitationStates[currentNodeIdentifier] === 1) {
      maximumCycleLength = Math.max(
        maximumCycleLength,
        currentPathDepth - nodeDiscoveryDepths[currentNodeIdentifier]
      );
      return;
    }

    nodeVisitationStates[currentNodeIdentifier] = 1;
    nodeDiscoveryDepths[currentNodeIdentifier] = currentPathDepth;

    const nextNodeIdentifier = edges[currentNodeIdentifier];
    if (nextNodeIdentifier !== -1) {
      traverseForCycles(nextNodeIdentifier, currentPathDepth + 1);
    }

    nodeVisitationStates[currentNodeIdentifier] = 2;
  }

  return maximumCycleLength;
};
