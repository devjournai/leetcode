/**
 * Stone Game III
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var stoneGameIII = function (stoneValue) {
  const totalStones = stoneValue.length;
  const memoizationTable = new Array(totalStones + 1).fill(undefined);

  function computeDifferential(currentIdx) {
    if (currentIdx >= totalStones) {
      return 0;
    }
    if (memoizationTable[currentIdx] !== undefined) {
      return memoizationTable[currentIdx];
    }

    let maximumDifferential = -Infinity;
    let cumulativeValue = 0;

    for (
      let numToTake = 1;
      numToTake <= 3 && currentIdx + numToTake - 1 < totalStones;
      numToTake++
    ) {
      cumulativeValue += stoneValue[currentIdx + numToTake - 1];
      const nextTurnDifferential = computeDifferential(currentIdx + numToTake);
      maximumDifferential = Math.max(
        maximumDifferential,
        cumulativeValue - nextTurnDifferential,
      );
    }

    memoizationTable[currentIdx] = maximumDifferential;
    return maximumDifferential;
  }

  const aliceDifferential = computeDifferential(0);

  if (aliceDifferential > 0) {
    return "Alice";
  } else if (aliceDifferential < 0) {
    return "Bob";
  } else {
    return "Tie";
  }
};
