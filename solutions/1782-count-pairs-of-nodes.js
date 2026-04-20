/**
 * Count Pairs Of Nodes
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
      (edgePairCounts.get(edgeKeyIdentifier) || 0) + 1,
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
