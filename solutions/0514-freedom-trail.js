/**
 * Freedom Trail
 * Intuition: For each key character, try every ring index that matches it, paying the shorter rotation plus a spell, then recurse. Memoize on `(ring pointer, key index)`.
 * Approach: 1. `calculateMinimumSteps(currentRingPointer, currentKeyWordIndex)` returns 0 when the key is done. 2. For each matching `ringScanIndex`, cost is `min(abs, n-abs)+1` plus the recursive rest. 3. Cache results in `memoizationMap`. Start at pointer 0, key 0.
 * Dry Run: ring = "god", key = "gd".
 *   - Spell 'g' at 0 (0 rotate + 1). Then 'd' at 2: min(2,1)+1=2. Total 3.
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
          ringStringLength - absoluteDistance
        );

        const charStepCost = rotationMoves + 1;
        const futurePathCost = calculateMinimumSteps(
          ringScanIndex,
          currentKeyWordIndex + 1
        );

        minimumAccumulatedSteps = Math.min(
          minimumAccumulatedSteps,
          charStepCost + futurePathCost
        );
      }
    }

    memoizationMap.set(memoLookupKey, minimumAccumulatedSteps);
    return minimumAccumulatedSteps;
  };

  return calculateMinimumSteps(0, 0);
};
