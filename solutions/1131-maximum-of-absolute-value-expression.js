/**
 * Maximum Of Absolute Value Expression
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxAbsValExpr = function (arr1, arr2) {
  const totalElements = arr1.length;
  let maximumAchieved = 0;
  const coefficientPairs = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  for (const currentSigns of coefficientPairs) {
    const signForArr1 = currentSigns[0];
    const signForArr2 = currentSigns[1];

    let minimumComputedValue = Infinity;
    let maximumComputedValue = -Infinity;

    for (let currentIndex = 0; currentIndex < totalElements; ++currentIndex) {
      const currentCombinedValue =
        signForArr1 * arr1[currentIndex] +
        signForArr2 * arr2[currentIndex] +
        currentIndex;
      minimumComputedValue = Math.min(
        minimumComputedValue,
        currentCombinedValue,
      );
      maximumComputedValue = Math.max(
        maximumComputedValue,
        currentCombinedValue,
      );
    }

    const currentRangeDifference = maximumComputedValue - minimumComputedValue;
    maximumAchieved = Math.max(maximumAchieved, currentRangeDifference);
  }

  return maximumAchieved;
};
