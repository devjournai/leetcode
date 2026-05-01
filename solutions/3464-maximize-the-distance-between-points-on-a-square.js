/**
 * Maximize the Distance Between Points on a Square
 * Time Complexity: O(N log N + N * K * log N * log D)
 * Space Complexity: O(N)
 */
var maxDistance = function (
  squareSideLength,
  pointCoordinates,
  pointsToSelect,
) {
  const totalPointCount = pointCoordinates.length;
  const perimeterPositions = new Array(totalPointCount);

  for (let loopIterator = 0; loopIterator < totalPointCount; loopIterator++) {
    const [currentX, currentY] = pointCoordinates[loopIterator];
    let calculatedPosition;

    if (currentY === 0) {
      calculatedPosition = currentX;
    } else if (currentX === squareSideLength) {
      calculatedPosition = squareSideLength + currentY;
    } else if (currentY === squareSideLength) {
      calculatedPosition = 2 * squareSideLength + (squareSideLength - currentX);
    } else {
      // currentX === 0
      calculatedPosition = 3 * squareSideLength + (squareSideLength - currentY);
    }
    perimeterPositions[loopIterator] = calculatedPosition;
  }

  perimeterPositions.sort((valA, valB) => valA - valB);

  const fullPerimeterLength = 4 * squareSideLength;
  const extendedPerimeterPositions = new Array(totalPointCount * 2);

  for (
    let extendedLoopIndex = 0;
    extendedLoopIndex < totalPointCount;
    extendedLoopIndex++
  ) {
    extendedPerimeterPositions[extendedLoopIndex] =
      perimeterPositions[extendedLoopIndex];
    extendedPerimeterPositions[extendedLoopIndex + totalPointCount] =
      perimeterPositions[extendedLoopIndex] + fullPerimeterLength;
  }

  let finalResult = 0;
  let searchLowerBound = 0;
  let searchUpperBound = 2 * squareSideLength;

  while (searchLowerBound <= searchUpperBound) {
    const midCandidateDistance = Math.floor(
      (searchLowerBound + searchUpperBound) / 2,
    );
    if (canWePlacePoints(midCandidateDistance)) {
      finalResult = midCandidateDistance;
      searchLowerBound = midCandidateDistance + 1;
    } else {
      searchUpperBound = midCandidateDistance - 1;
    }
  }

  return finalResult;

  function canWePlacePoints(checkDistance) {
    if (pointsToSelect === 1) return true;

    for (
      let startPointIndex = 0;
      startPointIndex < totalPointCount;
      startPointIndex++
    ) {
      let currentTrackingIndex = startPointIndex;
      let lastSelectedPosition = extendedPerimeterPositions[startPointIndex];
      const searchLimitForNext = startPointIndex + totalPointCount;
      let placementSuccess = true;

      for (
        let pointsPlacedCounter = 1;
        pointsPlacedCounter < pointsToSelect;
        pointsPlacedCounter++
      ) {
        const nextRequiredPosition = lastSelectedPosition + checkDistance;

        let searchLeftEdge = currentTrackingIndex + 1;
        let searchRightEdge = searchLimitForNext;

        while (searchLeftEdge < searchRightEdge) {
          const searchMidPoint = Math.floor(
            (searchLeftEdge + searchRightEdge) / 2,
          );
          if (
            extendedPerimeterPositions[searchMidPoint] < nextRequiredPosition
          ) {
            searchLeftEdge = searchMidPoint + 1;
          } else {
            searchRightEdge = searchMidPoint;
          }
        }

        if (searchLeftEdge === searchLimitForNext) {
          placementSuccess = false;
          break;
        }
        currentTrackingIndex = searchLeftEdge;
        lastSelectedPosition = extendedPerimeterPositions[currentTrackingIndex];
      }

      if (placementSuccess) {
        const distanceToEndWrap =
          extendedPerimeterPositions[startPointIndex] +
          fullPerimeterLength -
          lastSelectedPosition;
        if (distanceToEndWrap >= checkDistance) {
          return true;
        }
      }
    }
    return false;
  }
};
