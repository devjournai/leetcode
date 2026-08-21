/**
 * Sum Of Distances In Tree
 * Intuition: Root at 0: subtree sizes and distance sums come from children (`dist[parent] += dist[child] + size[child]`). Reroot: a child's answer is `parentDist - childSize + (N - childSize)`.
 * Approach: 1. Build undirected `adjacencyList`. Fill `subtreeNodeCount` with 1 and `totalDistances` with 0. 2. DFS `calculateSubtreeInfo(0,-1)`. 3. DFS `propagateDistances` using the reroot formula. 4. Return `totalDistances`.
 * Dry Run: N=6, edges=[[0,1],[0,2],[2,3],[2,4],[2,5]].
 *   After first DFS, dist[0]=8. Reroot to 2: 8-4+(6-4)=8. Answers [8,12,6,10,10,10].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var sumOfDistancesInTree = function (totalNodes, connections) {
  const adjacencyList = Array.from({ length: totalNodes }, () => []);
  const subtreeNodeCount = new Array(totalNodes).fill(1);
  const totalDistances = new Array(totalNodes).fill(0);

  for (const [nodeOne, nodeTwo] of connections) {
    adjacencyList[nodeOne].push(nodeTwo);
    adjacencyList[nodeTwo].push(nodeOne);
  }

  function calculateSubtreeInfo(currentNode, parentOfNode) {
    for (const neighborNode of adjacencyList[currentNode]) {
      if (neighborNode !== parentOfNode) {
        calculateSubtreeInfo(neighborNode, currentNode);
        subtreeNodeCount[currentNode] += subtreeNodeCount[neighborNode];
        totalDistances[currentNode] +=
          totalDistances[neighborNode] + subtreeNodeCount[neighborNode];
      }
    }
  }

  function propagateDistances(currentNodeIter, parentOfNodeIter) {
    for (const connectedNode of adjacencyList[currentNodeIter]) {
      if (connectedNode !== parentOfNodeIter) {
        totalDistances[connectedNode] =
          totalDistances[currentNodeIter] -
          subtreeNodeCount[connectedNode] +
          (totalNodes - subtreeNodeCount[connectedNode]);
        propagateDistances(connectedNode, currentNodeIter);
      }
    }
  }

  calculateSubtreeInfo(0, -1);
  propagateDistances(0, -1);

  return totalDistances;
};
