/**
 * Maximum Number Of K Divisible Components
 * Intuition: The problem asks to maximize the number of components where each component's sum of values is divisible by k. This suggests a post-order traversal (DFS) where we calculate the sum of values for a subtree. If a subtree's total value is divisible by k, it forms a valid component. To maximize component count, we should "cut" this component from its parent and count it. Its value then contributes zero to its parent's sum, allowing its parent to potentially form another independent k-divisible component.
 * Approach: 1. Construct an adjacency list representation of the tree from the given edges. 2. Initialize a counter for k-divisible components to zero. 3. Perform a Depth-First Search (DFS) starting from an arbitrary node (e.g., node 0), treating its parent as -1. 4. In the DFS function, for each node, calculate the sum of its own value and the sums returned by its children (excluding the parent). 5. If this accumulated sum for the current node's subtree (including itself and its uncategorized descendants) is divisible by k, increment the component counter and return 0 (to signify that this component is "cut" and doesn't contribute to its parent's sum). 6. Otherwise, return the accumulated sum to its parent. 7. The final value of the component counter is the maximum number of k-divisible components.
 * Dry Run:
 *   n = 3, edges = [[0,1],[1,2]], values = [1,2,3], k = 3
 *   adjacencyStructures = [[1], [0,2], [1]]
 *   totalDivisibleComponents = 0
 *
 *   1. Initial call: exploreNodeForSum(0, -1)
 *      - currentTraversalNode = 0, parentOfCurrentNode = -1
 *      - aggregateSubtreeValue = values[0] = 1
 *      - neighbors of 0: [1]
 *      - connectedNeighbor = 1 (not -1)
 *        - Call exploreNodeForSum(1, 0)
 *          - currentTraversalNode = 1, parentOfCurrentNode = 0
 *          - aggregateSubtreeValue = values[1] = 2
 *          - neighbors of 1: [0,2]
 *          - connectedNeighbor = 0 (is parentOfCurrentNode, skip)
 *          - connectedNeighbor = 2 (not parentOfCurrentNode)
 *            - Call exploreNodeForSum(2, 1)
 *              - currentTraversalNode = 2, parentOfCurrentNode = 1
 *              - aggregateSubtreeValue = values[2] = 3
 *              - neighbors of 2: [1]
 *              - connectedNeighbor = 1 (is parentOfCurrentNode, skip)
 *              - No more neighbors.
 *              - Check aggregateSubtreeValue % k: 3 % 3 === 0
 *                - totalDivisibleComponents becomes 1
 *                - Return 0
 *            - childSubtreeContribution = 0 (from exploreNodeForSum(2,1))
 *            - aggregateSubtreeValue += childSubtreeContribution => 2 + 0 = 2
 *          - No more neighbors.
 *          - Check aggregateSubtreeValue % k: 2 % 3 !== 0
 *            - Return 2
 *        - childSubtreeContribution = 2 (from exploreNodeForSum(1,0))
 *        - aggregateSubtreeValue += childSubtreeContribution => 1 + 2 = 3
 *      - No more neighbors.
 *      - Check aggregateSubtreeValue % k: 3 % 3 === 0
 *        - totalDivisibleComponents becomes 2
 *        - Return 0
 *
 *   2. Initial call returns 0.
 *   3. Final totalDivisibleComponents = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxKDivisibleComponents = function (n, edges, values, k) {
  const adjacencyStructures = Array.from({ length: n }, () => []);
  for (const edgeTuple of edges) {
    const firstNode = edgeTuple[0];
    const secondNode = edgeTuple[1];
    adjacencyStructures[firstNode].push(secondNode);
    adjacencyStructures[secondNode].push(firstNode);
  }

  let totalDivisibleComponents = 0;

  const exploreNodeForSum = (currentTraversalNode, parentOfCurrentNode) => {
    let aggregateSubtreeValue = values[currentTraversalNode];

    for (const connectedNeighbor of adjacencyStructures[currentTraversalNode]) {
      if (connectedNeighbor !== parentOfCurrentNode) {
        const childSubtreeContribution = exploreNodeForSum(
          connectedNeighbor,
          currentTraversalNode,
        );
        aggregateSubtreeValue += childSubtreeContribution;
      }
    }

    if (aggregateSubtreeValue % k === 0) {
      totalDivisibleComponents++;
      return 0;
    }

    return aggregateSubtreeValue;
  };

  exploreNodeForSum(0, -1);

  return totalDivisibleComponents;
};
