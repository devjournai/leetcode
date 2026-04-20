/**
 * Find Critical And Pseudo Critical Edges In Minimum Spanning Tree
 * Time Complexity: O(E^2 * α(N))
 * Space Complexity: O(N + E)
 */
var findCriticalAndPseudoCriticalEdges = function (totalNodes, initialEdges) {
  const indexedAndSortedEdges = initialEdges.map((edgeInfo, originalIndex) => [
    ...edgeInfo,
    originalIndex,
  ]);
  indexedAndSortedEdges.sort((edgeA, edgeB) => edgeA[2] - edgeB[2]);

  function findSetRepresentative(parentMap, childNode) {
    if (parentMap[childNode] === childNode) {
      return childNode;
    }
    parentMap[childNode] = findSetRepresentative(
      parentMap,
      parentMap[childNode],
    );
    return parentMap[childNode];
  }

  function uniteComponents(componentParents, componentRanks, nodeOne, nodeTwo) {
    const rootOneComponent = findSetRepresentative(componentParents, nodeOne);
    const rootTwoComponent = findSetRepresentative(componentParents, nodeTwo);

    if (rootOneComponent === rootTwoComponent) {
      return false;
    }

    if (componentRanks[rootOneComponent] < componentRanks[rootTwoComponent]) {
      componentParents[rootOneComponent] = rootTwoComponent;
    } else if (
      componentRanks[rootOneComponent] > componentRanks[rootTwoComponent]
    ) {
      componentParents[rootTwoComponent] = rootOneComponent;
    } else {
      componentParents[rootTwoComponent] = rootOneComponent;
      componentRanks[rootOneComponent]++;
    }
    return true;
  }

  function calculateMstCost(
    numGraphNodes,
    allGraphEdgesSorted,
    omitEdgeIndex = -1,
    forceIncludeEdgeIndex = -1,
  ) {
    const currentParentsArray = Array.from(
      { length: numGraphNodes },
      (_, idx) => idx,
    );
    const currentRanksArray = new Array(numGraphNodes).fill(0);
    let currentAccumulatedWeight = 0;
    let edgesFormingTreeCount = 0;

    if (forceIncludeEdgeIndex !== -1) {
      const forceIncludedEdgeDetails =
        allGraphEdgesSorted[forceIncludeEdgeIndex];
      const [uNode, vNode, edgeCostValue] = forceIncludedEdgeDetails;
      if (
        uniteComponents(currentParentsArray, currentRanksArray, uNode, vNode)
      ) {
        currentAccumulatedWeight += edgeCostValue;
        edgesFormingTreeCount++;
      }
    }

    for (
      let edgeIterationCounter = 0;
      edgeIterationCounter < allGraphEdgesSorted.length;
      edgeIterationCounter++
    ) {
      if (
        edgeIterationCounter === omitEdgeIndex ||
        edgeIterationCounter === forceIncludeEdgeIndex
      ) {
        continue;
      }

      const [firstConnectedNode, secondConnectedNode, currentEdgeWeight] =
        allGraphEdgesSorted[edgeIterationCounter];
      if (
        uniteComponents(
          currentParentsArray,
          currentRanksArray,
          firstConnectedNode,
          secondConnectedNode,
        )
      ) {
        currentAccumulatedWeight += currentEdgeWeight;
        edgesFormingTreeCount++;
      }
    }

    return edgesFormingTreeCount === numGraphNodes - 1
      ? currentAccumulatedWeight
      : Infinity;
  }

  const minSpanningTreeWeight = calculateMstCost(
    totalNodes,
    indexedAndSortedEdges,
  );

  const criticalEdgeResults = [];
  const pseudoCriticalEdgeResults = [];

  for (
    let edgeExaminationIndex = 0;
    edgeExaminationIndex < indexedAndSortedEdges.length;
    edgeExaminationIndex++
  ) {
    const weightExcludingCurrent = calculateMstCost(
      totalNodes,
      indexedAndSortedEdges,
      edgeExaminationIndex,
    );
    if (weightExcludingCurrent > minSpanningTreeWeight) {
      criticalEdgeResults.push(indexedAndSortedEdges[edgeExaminationIndex][3]);
    } else {
      const weightIncludingCurrent = calculateMstCost(
        totalNodes,
        indexedAndSortedEdges,
        -1,
        edgeExaminationIndex,
      );
      if (weightIncludingCurrent === minSpanningTreeWeight) {
        pseudoCriticalEdgeResults.push(
          indexedAndSortedEdges[edgeExaminationIndex][3],
        );
      }
    }
  }

  return [criticalEdgeResults, pseudoCriticalEdgeResults];
};
