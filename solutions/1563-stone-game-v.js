/**
 * Stone Game V
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var stoneGameV = function (stoneValue) {
  const arrayLength = stoneValue.length;
  const accumulatedSums = Array.from({ length: arrayLength + 1 }, () => 0);
  const memoTable = Array.from({ length: arrayLength }, () =>
    new Array(arrayLength).fill(-1),
  );

  for (let currentStone = 0; currentStone < arrayLength; currentStone++) {
    accumulatedSums[currentStone + 1] =
      accumulatedSums[currentStone] + stoneValue[currentStone];
  }

  const computeAliceScore = (leftIndex, rightIndex) => {
    if (leftIndex >= rightIndex) {
      return 0;
    }
    if (memoTable[leftIndex][rightIndex] !== -1) {
      return memoTable[leftIndex][rightIndex];
    }

    let currentMaximum = 0;

    for (let pivotPoint = leftIndex; pivotPoint < rightIndex; pivotPoint++) {
      const sectionOneSum =
        accumulatedSums[pivotPoint + 1] - accumulatedSums[leftIndex];
      const sectionTwoSum =
        accumulatedSums[rightIndex + 1] - accumulatedSums[pivotPoint + 1];

      let scoreOptionA;
      let scoreOptionB;

      if (sectionOneSum > sectionTwoSum) {
        scoreOptionA =
          sectionTwoSum + computeAliceScore(pivotPoint + 1, rightIndex);
        currentMaximum = Math.max(currentMaximum, scoreOptionA);
      } else if (sectionOneSum < sectionTwoSum) {
        scoreOptionA = sectionOneSum + computeAliceScore(leftIndex, pivotPoint);
        currentMaximum = Math.max(currentMaximum, scoreOptionA);
      } else {
        scoreOptionA =
          sectionTwoSum + computeAliceScore(pivotPoint + 1, rightIndex);
        scoreOptionB = sectionOneSum + computeAliceScore(leftIndex, pivotPoint);

        currentMaximum = Math.max(currentMaximum, scoreOptionA, scoreOptionB);
      }
    }

    memoTable[leftIndex][rightIndex] = currentMaximum;
    return currentMaximum;
  };

  return computeAliceScore(0, arrayLength - 1);
};
