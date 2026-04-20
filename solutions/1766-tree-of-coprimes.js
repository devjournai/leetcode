/**
 * Tree Of Coprimes
 * Time Complexity: O(N * MaxValue * log(MaxValue))
 * Space Complexity: O(N + MaxValue)
 */
var getCoprimes = function (nodeValues, treeEdges) {
  const nodeCountTotal = nodeValues.length;
  const graphRepresentation = Array.from({ length: nodeCountTotal }, () => []);

  for (let edgeCounter = 0; edgeCounter < treeEdges.length; ++edgeCounter) {
    const edgeNodeU = treeEdges[edgeCounter][0];
    const edgeNodeV = treeEdges[edgeCounter][1];
    graphRepresentation[edgeNodeU].push(edgeNodeV);
    graphRepresentation[edgeNodeV].push(edgeNodeU);
  }

  const finalAnswerList = Array(nodeCountTotal).fill(-1);
  const ancestryStackPerValue = Array(51)
    .fill()
    .map(() => []);
  const nodesAlreadyProcessed = new Set();

  function computeGreatestCommonDivisor(firstOperand, secondOperand) {
    let tempDividend = firstOperand;
    let tempDivisor = secondOperand;
    while (tempDivisor) {
      const remainderValue = tempDividend % tempDivisor;
      tempDividend = tempDivisor;
      tempDivisor = remainderValue;
    }
    return tempDividend;
  }

  function depthFirstSearchTraversal(
    currentTreeTraversalNode,
    currentTreeTraversalDepth,
    parentOfCurrentNode,
  ) {
    const currentNodesValue = nodeValues[currentTreeTraversalNode];
    let maximumDepthReached = -1;
    let closestCoprimeAncestorFound = -1;

    for (
      let coprimeCandidateValue = 1;
      coprimeCandidateValue <= 50;
      ++coprimeCandidateValue
    ) {
      if (
        computeGreatestCommonDivisor(
          currentNodesValue,
          coprimeCandidateValue,
        ) === 1 &&
        ancestryStackPerValue[coprimeCandidateValue].length > 0
      ) {
        const latestAncestorEntry =
          ancestryStackPerValue[coprimeCandidateValue].at(-1);
        const ancestorNodeIdFromStack = latestAncestorEntry[0];
        const ancestorDepthFromStack = latestAncestorEntry[1];
        if (ancestorDepthFromStack > maximumDepthReached) {
          maximumDepthReached = ancestorDepthFromStack;
          closestCoprimeAncestorFound = ancestorNodeIdFromStack;
        }
      }
    }

    finalAnswerList[currentTreeTraversalNode] = closestCoprimeAncestorFound;
    ancestryStackPerValue[currentNodesValue].push([
      currentTreeTraversalNode,
      currentTreeTraversalDepth,
    ]);
    nodesAlreadyProcessed.add(currentTreeTraversalNode);

    graphRepresentation[currentTreeTraversalNode].forEach(
      (currentNeighborId) => {
        if (!nodesAlreadyProcessed.has(currentNeighborId)) {
          depthFirstSearchTraversal(
            currentNeighborId,
            currentTreeTraversalDepth + 1,
            currentTreeTraversalNode,
          );
        }
      },
    );

    ancestryStackPerValue[currentNodesValue].pop();
  }

  depthFirstSearchTraversal(0, 0, -1);
  return finalAnswerList;
};
