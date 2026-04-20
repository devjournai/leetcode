/**
 * Freedom Trail
 * Time Complexity: O(R^2 * K)
 * Space Complexity: O(R * K)
 */
var findRotateSteps = function (ringChars, keyChars) {
  const ringStringLength = ringChars.length;
  const keyStringLength = keyChars.length;

  const memoizationMap = new Map();

  const calculateMinimumSteps = (currentRingPointer, currentKeyWordIndex) => {
    if (currentKeyWordIndex === keyStringLength) {
      return 0;
    }

    const memoLookupKey = `${currentRingPointer},${currentKeyWordIndex}`;
    if (memoizationMap.has(memoLookupKey)) {
      return memoizationMap.get(memoLookupKey);
    }

    let minimumAccumulatedSteps = Infinity;

    for (
      let ringScanIndex = 0;
      ringScanIndex < ringStringLength;
      ringScanIndex++
    ) {
      if (ringChars[ringScanIndex] === keyChars[currentKeyWordIndex]) {
        const absoluteDistance = Math.abs(ringScanIndex - currentRingPointer);
        const rotationMoves = Math.min(
          absoluteDistance,
          ringStringLength - absoluteDistance,
        );

        const charStepCost = rotationMoves + 1;
        const futurePathCost = calculateMinimumSteps(
          ringScanIndex,
          currentKeyWordIndex + 1,
        );

        minimumAccumulatedSteps = Math.min(
          minimumAccumulatedSteps,
          charStepCost + futurePathCost,
        );
      }
    }

    memoizationMap.set(memoLookupKey, minimumAccumulatedSteps);
    return minimumAccumulatedSteps;
  };

  return calculateMinimumSteps(0, 0);
};
