/**
 * Erect The Fence
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var outerTrees = function (trees) {
  const totalTrees = trees.length;

  if (totalTrees <= 2) {
    return trees;
  }

  const calculateOrientation = (pointOne, pointTwo, pointThree) => {
    return (
      (pointTwo[0] - pointOne[0]) * (pointThree[1] - pointOne[1]) -
      (pointTwo[1] - pointOne[1]) * (pointThree[0] - pointOne[0])
    );
  };

  const sortedCoordinates = trees.slice().sort((coordinateA, coordinateB) => {
    if (coordinateA[0] === coordinateB[0]) {
      return coordinateA[1] - coordinateB[1];
    }
    return coordinateA[0] - coordinateB[0];
  });

  const upperHullSegment = [];
  const lowerHullSegment = [];

  for (
    let currentPointIndex = 0;
    currentPointIndex < totalTrees;
    currentPointIndex++
  ) {
    let currentPointFromSorted = sortedCoordinates[currentPointIndex];
    while (
      upperHullSegment.length >= 2 &&
      calculateOrientation(
        upperHullSegment[upperHullSegment.length - 2],
        upperHullSegment[upperHullSegment.length - 1],
        currentPointFromSorted,
      ) < 0
    ) {
      upperHullSegment.pop();
    }
    upperHullSegment.push(currentPointFromSorted);
  }

  for (
    let currentPointIndexReverse = totalTrees - 1;
    currentPointIndexReverse >= 0;
    currentPointIndexReverse--
  ) {
    let currentPointForLower = sortedCoordinates[currentPointIndexReverse];
    while (
      lowerHullSegment.length >= 2 &&
      calculateOrientation(
        lowerHullSegment[lowerHullSegment.length - 2],
        lowerHullSegment[lowerHullSegment.length - 1],
        currentPointForLower,
      ) < 0
    ) {
      lowerHullSegment.pop();
    }
    lowerHullSegment.push(currentPointForLower);
  }

  const uniquePerimeterPoints = new Set();
  for (const pointFromUpper of upperHullSegment) {
    uniquePerimeterPoints.add(JSON.stringify(pointFromUpper));
  }
  for (const pointFromLower of lowerHullSegment) {
    uniquePerimeterPoints.add(JSON.stringify(pointFromLower));
  }

  const finalResultCoordinates = Array.from(uniquePerimeterPoints).map(
    (pointStringRepresentation) => JSON.parse(pointStringRepresentation),
  );

  return finalResultCoordinates;
};
