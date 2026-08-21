/**
 * Minimize The Total Price Of The Trips
 * Intuition: The problem requires finding a set of non-adjacent nodes to halve their prices to minimize the total sum of prices for all trips. This is a classic tree dynamic programming problem. First, we need to determine how many times each node is part of any trip. Then, for each node, we have two choices: either keep its price full or halve its price. The "non-adjacent" constraint means if a node's price is halved, its immediate neighbors cannot have their prices halved. This naturally leads to a DP approach where each node's state depends on its children's choices, and the choice for a parent impacts its children.
 * Approach:
 * 1. Build an adjacency list (graph) from the given `edges` to represent the tree structure.
 * 2. For each trip `[start, end]`, find the unique path between `start` and `end` in the tree. During this path traversal, count how many times each node is visited across all trips. This `tripVisitCounts` array will store the effective multiplier for each node's original price.
 * 3. Implement a recursive Depth-First Search (DFS) based dynamic programming function, `computeMinimumCosts(currentNode, parentNode)`. This function will return an array `[costIfCurrentNodeFull, costIfCurrentNodeHalved]`.
 *    a. `costIfCurrentNodeFull`: The minimum cost for the subtree rooted at `currentNode` if `currentNode` itself is NOT halved. In this case, its children *can* choose to be halved or not, so we sum `min(childFullCost, childHalvedCost)` for all children.
 *    b. `costIfCurrentNodeHalved`: The minimum cost for the subtree rooted at `currentNode` if `currentNode` *is* halved. Due to the non-adjacent constraint, its children *cannot* be halved, so we sum `childFullCost` for all children.
 * 4. The base case for the DP is a leaf node, or when `currentNode` has no children other than its `parentNode`.
 * 5. The final answer is the minimum of the two values returned by calling `computeMinimumCosts` on an arbitrary root node (e.g., node 0) with a dummy parent (-1).
 * Dry Run: Let's use n=4, edges=[[0,1],[1,2],[1,3]], price=[2,2,2,2], trips=[[0,2]].
 * Graph: 0--1--2, 1--3
 * 1. `nodeAdjacencyMap` is built.
 * 2. For trip [0,2]: `pathFinder(0,2,-1,[])` identifies path `0-1-2`. `tripVisitCounts` becomes `[1,1,1,0]`. Node 3 is not visited.
 * 3. `computeMinimumCosts(0, -1)` is called.
 *    a. `computeMinimumCosts(2, 1)` (leaf node):
 *       `currentNodesPriceValue = 2`, `currentNodesVisitCountValue = 1`.
 *       `notHalvedSubtreeCost = 2 * 1 = 2`.
 *       `halvedSubtreeCost = (2 * 1) / 2 = 1`.
 *       Returns `[2, 1]`.
 *    b. `computeMinimumCosts(3, 1)` (leaf node):
 *       `currentNodesPriceValue = 2`, `currentNodesVisitCountValue = 0`.
 *       `notHalvedSubtreeCost = 2 * 0 = 0`.
 *       `halvedSubtreeCost = (2 * 0) / 2 = 0`.
 *       Returns `[0, 0]`.
 *    c. `computeMinimumCosts(1, 0)`:
 *       `currentNodesPriceValue = 2`, `currentNodesVisitCountValue = 1`.
 *       Initial `notHalvedSubtreeCost = 2`, `halvedSubtreeCost = 1`.
 *       Child 2: `[childPriceIfFull_2, childPriceIfHalved_2] = [2, 1]`.
 *         `notHalvedSubtreeCost += Math.min(2, 1) = 1` -> `2 + 1 = 3`.
 *         `halvedSubtreeCost += 2` (child 2 is full) -> `1 + 2 = 3`.
 *       Child 3: `[childPriceIfFull_3, childPriceIfHalved_3] = [0, 0]`.
 *         `notHalvedSubtreeCost += Math.min(0, 0) = 0` -> `3 + 0 = 3`.
 *         `halvedSubtreeCost += 0` (child 3 is full) -> `3 + 0 = 3`.
 *       Returns `[3, 3]`.
 *    d. `computeMinimumCosts(0, -1)` (root call):
 *       `currentNodesPriceValue = 2`, `currentNodesVisitCountValue = 1`.
 *       Initial `notHalvedSubtreeCost = 2`, `halvedSubtreeCost = 1`.
 *       Child 1: `[childPriceIfFull_1, childPriceIfHalved_1] = [3, 3]`.
 *         `notHalvedSubtreeCost += Math.min(3, 3) = 3` -> `2 + 3 = 5`.
 *         `halvedSubtreeCost += 3` (child 1 is full) -> `1 + 3 = 4`.
 *       Returns `[5, 4]`.
 * 4. Final result: `Math.min(5, 4) = 4`.
 * Time Complexity: O(N * T)
 * Space Complexity: O(N)
 */
var minimumTotalPrice = function (
  totalNodes,
  edgeConnections,
  nodePrices,
  allTrips
) {
  const nodeAdjacencyMap = Array.from({ length: totalNodes }, () => []);
  for (const [firstNode, secondNode] of edgeConnections) {
    nodeAdjacencyMap[firstNode].push(secondNode);
    nodeAdjacencyMap[secondNode].push(firstNode);
  }

  const tripVisitCounts = new Array(totalNodes).fill(0);

  const pathFinder = (
    currentSearchNode,
    targetPathNode,
    searchParentNode,
    pathTraversalHistory
  ) => {
    pathTraversalHistory.push(currentSearchNode);
    if (currentSearchNode === targetPathNode) {
      for (const pathNodeId of pathTraversalHistory) {
        tripVisitCounts[pathNodeId]++;
      }
      return true;
    }

    for (const adjacentNodeIdentifier of nodeAdjacencyMap[currentSearchNode]) {
      if (adjacentNodeIdentifier !== searchParentNode) {
        if (
          pathFinder(
            adjacentNodeIdentifier,
            targetPathNode,
            currentSearchNode,
            pathTraversalHistory
          )
        ) {
          return true;
        }
      }
    }

    pathTraversalHistory.pop();
    return false;
  };

  for (const [tripStartNode, tripEndNode] of allTrips) {
    pathFinder(tripStartNode, tripEndNode, -1, []);
  }

  const computeMinimumCosts = (
    currentComputationNode,
    computationParentNode
  ) => {
    const currentNodesPriceValue = nodePrices[currentComputationNode];
    const currentNodesVisitCountValue = tripVisitCounts[currentComputationNode];

    let notHalvedSubtreeCost =
      currentNodesPriceValue * currentNodesVisitCountValue;
    let halvedSubtreeCost =
      (currentNodesPriceValue * currentNodesVisitCountValue) / 2;

    for (const neighboringNodeId of nodeAdjacencyMap[currentComputationNode]) {
      if (neighboringNodeId === computationParentNode) {
        continue;
      }
      const [childPriceIfFull, childPriceIfHalved] = computeMinimumCosts(
        neighboringNodeId,
        currentComputationNode
      );
      notHalvedSubtreeCost += Math.min(childPriceIfFull, childPriceIfHalved);
      halvedSubtreeCost += childPriceIfFull;
    }

    return [notHalvedSubtreeCost, halvedSubtreeCost];
  };

  const [finalNotHalvedCost, finalHalvedCost] = computeMinimumCosts(0, -1);
  return Math.min(finalNotHalvedCost, finalHalvedCost);
};
