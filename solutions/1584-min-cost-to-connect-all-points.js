/**
 * Min Cost To Connect All Points
 * Time Complexity: O(N^2 log N)
 * Space Complexity: O(N^2)
 */
var minCostConnectPoints = function (points) {
  const numPoints = points.length;
  const allEdges = [];

  for (
    let currentPointIndex = 0;
    currentPointIndex < numPoints;
    currentPointIndex++
  ) {
    for (
      let anotherPointIndex = currentPointIndex + 1;
      anotherPointIndex < numPoints;
      anotherPointIndex++
    ) {
      const xCoordinate1 = points[currentPointIndex][0];
      const yCoordinate1 = points[currentPointIndex][1];
      const xCoordinate2 = points[anotherPointIndex][0];
      const yCoordinate2 = points[anotherPointIndex][1];

      const edgeConnectionWeight =
        Math.abs(xCoordinate1 - xCoordinate2) +
        Math.abs(yCoordinate1 - yCoordinate2);
      allEdges.push({
        sourceNode: currentPointIndex,
        destinationNode: anotherPointIndex,
        weightValue: edgeConnectionWeight,
      });
    }
  }

  allEdges.sort(
    (firstEdge, secondEdge) => firstEdge.weightValue - secondEdge.weightValue,
  );

  const parentTracking = Array(numPoints)
    .fill(0)
    .map((_ignoredValue, elementIndex) => elementIndex);
  const componentRank = Array(numPoints).fill(0);

  function findSetRepresentative(memberNode) {
    if (parentTracking[memberNode] === memberNode) {
      return memberNode;
    }
    parentTracking[memberNode] = findSetRepresentative(
      parentTracking[memberNode],
    );
    return parentTracking[memberNode];
  }

  function uniteComponents(nodeOne, nodeTwo) {
    let representativeOne = findSetRepresentative(nodeOne);
    let representativeTwo = findSetRepresentative(nodeTwo);

    if (representativeOne !== representativeTwo) {
      if (componentRank[representativeOne] < componentRank[representativeTwo]) {
        parentTracking[representativeOne] = representativeTwo;
      } else if (
        componentRank[representativeTwo] < componentRank[representativeOne]
      ) {
        parentTracking[representativeTwo] = representativeOne;
      } else {
        parentTracking[representativeTwo] = representativeOne;
        componentRank[representativeOne]++;
      }
      return true;
    }
    return false;
  }

  let accumulatedCost = 0;
  let edgesAccepted = 0;

  for (const currentEdge of allEdges) {
    if (uniteComponents(currentEdge.sourceNode, currentEdge.destinationNode)) {
      accumulatedCost += currentEdge.weightValue;
      edgesAccepted++;
      if (edgesAccepted === numPoints - 1) {
        break;
      }
    }
  }

  return accumulatedCost;
};
