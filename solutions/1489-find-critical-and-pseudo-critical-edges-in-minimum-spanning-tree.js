/**
 * Find Critical And Pseudo Critical Edges In Minimum Spanning Tree
 * Intuition: Kruskal MST cost is the baseline. An edge is critical if omitting it raises MST cost (or disconnects). It is pseudo-critical if forcing it in still matches the baseline cost.
 * Approach: 1. Tag edges with original indexes and sort by weight. 2. Union-find Kruskal helper can omit or force an edge. 3. Compute baseline MST. 4. For each edge, if omit cost > baseline it is critical; else if force cost equals baseline it is pseudo-critical.
 * Dry Run: n=5, edges forming two equal-weight spanning options
 *   - unique bridges become critical
 *   - interchangeable equal-weight edges become pseudo-critical
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
      parentMap[childNode]
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
    forceIncludeEdgeIndex = -1
  ) {
    const currentParentsArray = Array.from(
      { length: numGraphNodes },
      (_, idx) => idx
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
          secondConnectedNode
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
    indexedAndSortedEdges
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
      edgeExaminationIndex
    );
    if (weightExcludingCurrent > minSpanningTreeWeight) {
      criticalEdgeResults.push(indexedAndSortedEdges[edgeExaminationIndex][3]);
    } else {
      const weightIncludingCurrent = calculateMstCost(
        totalNodes,
        indexedAndSortedEdges,
        -1,
        edgeExaminationIndex
      );
      if (weightIncludingCurrent === minSpanningTreeWeight) {
        pseudoCriticalEdgeResults.push(
          indexedAndSortedEdges[edgeExaminationIndex][3]
        );
      }
    }
  }

  return [criticalEdgeResults, pseudoCriticalEdgeResults];
};
