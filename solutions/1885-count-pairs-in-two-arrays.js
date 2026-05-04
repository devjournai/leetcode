/**
 * Count Pairs In Two Arrays
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var countPairs = function (inputNum1, inputNum2) {
  const inputLength = inputNum1.length;

  const diffArrayGenerated = inputNum1.map(
    (mapCurrentVal, mapCurrentIdx) => mapCurrentVal - inputNum2[mapCurrentIdx],
  );

  diffArrayGenerated.sort((compA, compB) => compA - compB);

  let totalPairsFound = 0;

  const findFirstElementGreater = (bsArr, bsTarget, bsLowerBound) => {
    let bsCurrentLow = bsLowerBound;
    let bsCurrentHigh = bsArr.length - 1;
    let bsResultIdx = bsArr.length;

    while (bsCurrentLow <= bsCurrentHigh) {
      let bsMidpoint = Math.floor(
        bsCurrentLow + (bsCurrentHigh - bsCurrentLow) / 2,
      );
      if (bsArr[bsMidpoint] > bsTarget) {
        bsResultIdx = bsMidpoint;
        bsCurrentHigh = bsMidpoint - 1;
      } else {
        bsCurrentLow = bsMidpoint + 1;
      }
    }
    return bsResultIdx;
  };

  for (
    let firstPointerIndex = 0;
    firstPointerIndex < inputLength;
    ++firstPointerIndex
  ) {
    const searchTargetVal = -diffArrayGenerated[firstPointerIndex];
    const binarySearchStartIndex = firstPointerIndex + 1;

    const foundJIndex = findFirstElementGreater(
      diffArrayGenerated,
      searchTargetVal,
      binarySearchStartIndex,
    );

    if (foundJIndex < inputLength) {
      totalPairsFound += inputLength - foundJIndex;
    }
  }

  return totalPairsFound;
};
