/**
 * Coin Path
 * Time Complexity: O(N^2 * M)
 * Space Complexity: O(N)
 */
var cheapestJump = function (coinsArray, maximumJumpDistance) {
  const arrayLength = coinsArray.length;
  const minimumTotalCost = new Array(arrayLength + 1).fill(Infinity);
  const parentTraceMap = new Array(arrayLength + 1).fill(-1);

  minimumTotalCost[1] = coinsArray[0];

  const constructJourney = (
    ancestorMap,
    destinationIndex,
    provisionalParentIndex = null,
  ) => {
    const journeyIndices = [];
    let currentBuildIndex;

    if (provisionalParentIndex !== null) {
      journeyIndices.unshift(destinationIndex);
      currentBuildIndex = provisionalParentIndex;
    } else {
      currentBuildIndex = destinationIndex;
    }

    while (currentBuildIndex !== -1) {
      journeyIndices.unshift(currentBuildIndex);
      currentBuildIndex = ancestorMap[currentBuildIndex];
    }
    return journeyIndices;
  };

  const evaluateLexicographical = (firstRoute, secondRoute) => {
    const shorterLength = Math.min(firstRoute.length, secondRoute.length);
    for (
      let comparisonCursor = 0;
      comparisonCursor < shorterLength;
      comparisonCursor++
    ) {
      if (firstRoute[comparisonCursor] < secondRoute[comparisonCursor]) {
        return true;
      }
      if (firstRoute[comparisonCursor] > secondRoute[comparisonCursor]) {
        return false;
      }
    }
    return firstRoute.length < secondRoute.length;
  };

  for (
    let currentPosition = 1;
    currentPosition <= arrayLength;
    currentPosition++
  ) {
    if (
      coinsArray[currentPosition - 1] === -1 ||
      minimumTotalCost[currentPosition] === Infinity
    ) {
      continue;
    }

    for (
      let nextJumpPosition = currentPosition + 1;
      nextJumpPosition <=
      Math.min(currentPosition + maximumJumpDistance, arrayLength);
      nextJumpPosition++
    ) {
      if (coinsArray[nextJumpPosition - 1] === -1) {
        continue;
      }

      const potentialNewCost =
        minimumTotalCost[currentPosition] + coinsArray[nextJumpPosition - 1];

      if (potentialNewCost < minimumTotalCost[nextJumpPosition]) {
        minimumTotalCost[nextJumpPosition] = potentialNewCost;
        parentTraceMap[nextJumpPosition] = currentPosition;
      } else if (
        potentialNewCost === minimumTotalCost[nextJumpPosition] &&
        parentTraceMap[nextJumpPosition] !== -1
      ) {
        const existingPathCandidate = constructJourney(
          parentTraceMap,
          nextJumpPosition,
        );
        const proposedNewPath = constructJourney(
          parentTraceMap,
          nextJumpPosition,
          currentPosition,
        );

        if (evaluateLexicographical(proposedNewPath, existingPathCandidate)) {
          parentTraceMap[nextJumpPosition] = currentPosition;
        }
      }
    }
  }

  if (minimumTotalCost[arrayLength] === Infinity) {
    return [];
  }

  const finalPathSequence = [];
  let traceBackIndex = arrayLength;
  while (traceBackIndex !== -1) {
    finalPathSequence.unshift(traceBackIndex);
    traceBackIndex = parentTraceMap[traceBackIndex];
  }

  return finalPathSequence;
};
