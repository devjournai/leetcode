/**
 * Tree Of Coprimes
 * Intuition: Node values are at most 50, so the closest coprime ancestor is the deepest node among ancestry stacks of values whose gcd with the current value is 1. DFS push/pop keeps those stacks as the root-to-node path.
 * Approach: 1. Build `graphRepresentation`. 2. In `depthFirstSearchTraversal`, scan coprime candidate values 1..50, take the deepest stack top, and store it in `finalAnswerList`. 3. Push the node, recurse to unvisited neighbors, then pop. 4. Start at node 0.
 * Dry Run: values [2,3,3,2], edges 0-1, 1-2, 0-3.
 *   - Node 0: no ancestor → -1. Node 1 (3) sees ancestor 2 → 0. Node 2 (3) sees 2 at 0 (not coprime) and 3 at 1 (not coprime) → -1.
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
    parentOfCurrentNode
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
          coprimeCandidateValue
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
            currentTreeTraversalNode
          );
        }
      }
    );

    ancestryStackPerValue[currentNodesValue].pop();
  }

  depthFirstSearchTraversal(0, 0, -1);
  return finalAnswerList;
};
