/**
 * Minimum Edge Reversals So Every Node Is Reachable
 * Intuition: The problem asks for the minimum reversals for *each* node to be a root. This structure suggests a tree DP (dynamic programming on trees) or re-rooting technique. We can calculate the cost for an arbitrary root (e.g., node 0) using a DFS, and then efficiently update this cost for all other nodes using a second DFS.
 * Approach:
 * 1. Build an adjacency list representation of the graph. For each original edge (u, v), add (v, 0) to u's list (cost 0 to follow original direction) and (u, 1) to v's list (cost 1 to reverse edge and go v->u). This effectively encodes the reversal cost directly in the graph structure.
 * 2. Perform a first Depth-First Search (DFS) starting from an arbitrary root (e.g., node 0). This DFS (let's call it `computeSubtreeCosts`) calculates the total number of reversals needed for all edges in the subtree rooted at the current node *if the current node were reachable from its parent without reversal*. More precisely, it calculates the number of reversals needed in the subtree rooted at `currentNodeIndex` to make all nodes in that subtree reachable from `currentNodeIndex`, assuming `currentNodeIndex` itself is reachable. The initial call `computeSubtreeCosts(0, -1)` will give the total reversals needed if node 0 is the global source.
 * 3. Perform a second DFS (let's call it `propagateCosts`) to re-root the tree. This DFS starts from the same initial root (node 0) and uses the total reversals calculated in step 2. For each node, it stores its calculated reversal count. When moving from a `focusNode` to a `connectedNode`, it adjusts the reversal count: it subtracts the cost of the edge `focusNode -> connectedNode` (from the `focusNode`'s perspective) and adds the cost of the edge `connectedNode -> focusNode` (from the `connectedNode`'s new perspective as a potential root). This efficiently derives the reversal count for `connectedNode` if it were the root, based on the `focusNode`'s count.
 * 4. The `reversalCounts` array will hold the final answer for each node.
 * Dry Run:
 * n = 3, edges = [[0,1],[1,2]]
 * 1. Adjacency List (adjacencyList):
 *    - For [0,1]: adjacencyList[0] gets [1,0], adjacencyList[1] gets [0,1]
 *    - For [1,2]: adjacencyList[1] gets [2,0], adjacencyList[2] gets [1,1]
 *    Resulting adjacencyList:
 *    0: [[1,0]]
 *    1: [[0,1], [2,0]]
 *    2: [[1,1]]
 *
 * 2. `initialRootCost = computeSubtreeCosts(0, -1)`:
 *    - `computeSubtreeCosts(0, -1)`: `currentSubtreeCost = 0`
 *      - Iterates to `[1,0]` (neighbor 1, cost 0):
 *        - `computeSubtreeCosts(1, 0)`: `currentSubtreeCost = 0`
 *          - Skips parent `0`.
 *          - Iterates to `[2,0]` (neighbor 2, cost 0):
 *            - `computeSubtreeCosts(2, 1)`: `currentSubtreeCost = 0`
 *              - Skips parent `1`.
 *            - Returns 0.
 *          - `currentSubtreeCost` for node 1 becomes `0 + (0 + 0) = 0`.
 *        - Returns 0.
 *      - `currentSubtreeCost` for node 0 becomes `0 + (0 + 0) = 0`.
 *    `initialRootCost` = 0.
 *
 * 3. `propagateCosts(0, -1, 0)`: (focusNode=0, sourceNode=-1, costFromParent=0)
 *    - `reversalCounts[0] = 0`.
 *    - Iterates to `[1,0]` (connectedNodeIdentifier=1, edgeFlowCost=0):
 *      - `nextChildCost = reversalCounts[0] - edgeFlowCost + (1 - edgeFlowCost)`
 *      - `nextChildCost = 0 - 0 + (1 - 0) = 1`.
 *      - `propagateCosts(1, 0, 1)`: (focusNode=1, sourceNode=0, costFromParent=1)
 *        - `reversalCounts[1] = 1`.
 *        - Skips parent `0`.
 *        - Iterates to `[2,0]` (connectedNodeIdentifier=2, edgeFlowCost=0):
 *          - `nextChildCost = reversalCounts[1] - edgeFlowCost + (1 - edgeFlowCost)`
 *          - `nextChildCost = 1 - 0 + (1 - 0) = 2`.
 *          - `propagateCosts(2, 1, 2)`: (focusNode=2, sourceNode=1, costFromParent=2)
 *            - `reversalCounts[2] = 2`.
 *            - Skips parent `1`.
 *          - Returns.
 *        - Returns.
 *    - Returns.
 *
 * Final `reversalCounts` = `[0, 1, 2]`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minEdgeReversals = function (totalNodes, edgeConnections) {
  const adjacencyList = Array.from({ length: totalNodes }, () => []);

  for (const [firstNode, secondNode] of edgeConnections) {
    adjacencyList[firstNode].push([secondNode, 0]);
    adjacencyList[secondNode].push([firstNode, 1]);
  }

  const reversalCounts = new Array(totalNodes);

  const computeSubtreeCosts = (currentNodeIndex, parentNodeIndex) => {
    let currentSubtreeCost = 0;
    for (const [neighborNodeIdentifier, edgeDirectionCost] of adjacencyList[
      currentNodeIndex
    ]) {
      if (neighborNodeIdentifier !== parentNodeIndex) {
        currentSubtreeCost +=
          edgeDirectionCost +
          computeSubtreeCosts(neighborNodeIdentifier, currentNodeIndex);
      }
    }
    return currentSubtreeCost;
  };

  const initialRootCost = computeSubtreeCosts(0, -1);

  const propagateCosts = (focusNode, sourceNode, costFromParent) => {
    reversalCounts[focusNode] = costFromParent;
    for (const [connectedNodeIdentifier, edgeFlowCost] of adjacencyList[
      focusNode
    ]) {
      if (connectedNodeIdentifier !== sourceNode) {
        const nextChildCost =
          reversalCounts[focusNode] - edgeFlowCost + (1 - edgeFlowCost);
        propagateCosts(connectedNodeIdentifier, focusNode, nextChildCost);
      }
    }
  };

  propagateCosts(0, -1, initialRootCost);

  return reversalCounts;
};
