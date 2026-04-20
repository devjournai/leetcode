/**
 * Sum Of Distances In Tree
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
