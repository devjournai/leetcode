/**
 * Maximum Subarray Sum With One Deletion
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumSum = function (arr) {
  const inputArray = arr;

  let maxSumNoDeleteCurrent = inputArray[0];
  let maxSumOneDeleteCurrent = 0;
  let overallMaximumSum = inputArray[0];

  let loopIndex = 1;
  while (loopIndex < inputArray.length) {
    const currentElement = inputArray[loopIndex];
    const previousMaxSumNoDeletion = maxSumNoDeleteCurrent;

    maxSumNoDeleteCurrent = Math.max(
      currentElement,
      maxSumNoDeleteCurrent + currentElement,
    );
    maxSumOneDeleteCurrent = Math.max(
      previousMaxSumNoDeletion,
      maxSumOneDeleteCurrent + currentElement,
    );

    overallMaximumSum = Math.max(
      overallMaximumSum,
      maxSumNoDeleteCurrent,
      maxSumOneDeleteCurrent,
    );

    loopIndex++;
  }

  return overallMaximumSum;
};
