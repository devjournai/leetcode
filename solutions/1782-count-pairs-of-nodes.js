/**
 * Count Pairs Of Nodes
 * Intuition: Pair (a,b) is counted when deg(a)+deg(b) minus shared edges exceeds the query. Two-pointer on sorted degrees counts pairs with deg sum > q, then subtract pairs whose shared edges pull them back to ≤ q.
 * Approach: 1. Tally `nodeDegrees` and `edgePairCounts`. 2. Sort a copy of degrees. 3. For each query, two-pointer count degree-sum pairs, then decrement when `combinedDegreeSum - numEdgesBetweenNodes <= threshold` but the raw sum was above. 4. Store in `queryResults`.
 * Dry Run: n=4, edges=[[1,2],[2,4],[1,3],[2,3],[2,1]], queries=[2,3].
 *   - After shared-edge correction the answers are [6,5].
 * Time Complexity: O(N log N + Q * (N + E))
 * Space Complexity: O(N + E)
 */
var countPairs = function (nParam, edgesArray, queriesArray) {
  const nodeDegrees = Array(nParam + 1).fill(0);
  const edgePairCounts = new Map();

  for (const [firstNode, secondNode] of edgesArray) {
    nodeDegrees[firstNode]++;
    nodeDegrees[secondNode]++;

    const lowerNodeId = Math.min(firstNode, secondNode);
    const higherNodeId = Math.max(firstNode, secondNode);
    const edgeKeyIdentifier = `${lowerNodeId},${higherNodeId}`;

    edgePairCounts.set(
      edgeKeyIdentifier,
      (edgePairCounts.get(edgeKeyIdentifier) || 0) + 1
    );
  }

  const sortedNodeDegrees = Array(nParam);
  for (
    let currentDegreeIteration = 0;
    currentDegreeIteration < nParam;
    currentDegreeIteration++
  ) {
    sortedNodeDegrees[currentDegreeIteration] =
      nodeDegrees[currentDegreeIteration + 1];
  }
  sortedNodeDegrees.sort((degreeValA, degreeValB) => degreeValA - degreeValB);

  const queryResults = Array(queriesArray.length).fill(0);

  for (
    let queryIterationIndex = 0;
    queryIterationIndex < queriesArray.length;
    queryIterationIndex++
  ) {
    const currentQueryThreshold = queriesArray[queryIterationIndex];
    let runningPairCount = 0;

    let leftScanIndex = 0;
    let rightScanIndex = nParam - 1;

    while (leftScanIndex < rightScanIndex) {
      const degreeValLeft = sortedNodeDegrees[leftScanIndex];
      const degreeValRight = sortedNodeDegrees[rightScanIndex];

      if (degreeValLeft + degreeValRight > currentQueryThreshold) {
        runningPairCount += rightScanIndex - leftScanIndex;
        rightScanIndex--;
      } else {
        leftScanIndex++;
      }
    }

    for (const [edgeKeyFromMap, numEdgesBetweenNodes] of edgePairCounts) {
      const nodeIdentifiers = edgeKeyFromMap.split(",").map(Number);
      const nodeOneId = nodeIdentifiers[0];
      const nodeTwoId = nodeIdentifiers[1];

      const combinedDegreeSum = nodeDegrees[nodeOneId] + nodeDegrees[nodeTwoId];
      const incidentEdgeCount = combinedDegreeSum - numEdgesBetweenNodes;

      if (
        combinedDegreeSum > currentQueryThreshold &&
        incidentEdgeCount <= currentQueryThreshold
      ) {
        runningPairCount--;
      }
    }

    queryResults[queryIterationIndex] = runningPairCount;
  }

  return queryResults;
};
