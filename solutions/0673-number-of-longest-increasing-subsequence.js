/**
 * Number Of Longest Increasing Subsequence
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var findNumberOfLIS = function (nums) {
  const totalNumbers = nums.length;

  if (totalNumbers === 0) {
    return 0;
  }

  const lisLengthRegistry = new Array(totalNumbers).fill(1);
  const lisCountRegistry = new Array(totalNumbers).fill(1);

  let maximumLengthFound = 1;

  for (
    let currentItemIndex = 1;
    currentItemIndex < totalNumbers;
    currentItemIndex++
  ) {
    for (
      let precedingItemIndex = 0;
      precedingItemIndex < currentItemIndex;
      precedingItemIndex++
    ) {
      if (nums[currentItemIndex] > nums[precedingItemIndex]) {
        if (
          lisLengthRegistry[precedingItemIndex] + 1 >
          lisLengthRegistry[currentItemIndex]
        ) {
          lisLengthRegistry[currentItemIndex] =
            lisLengthRegistry[precedingItemIndex] + 1;
          lisCountRegistry[currentItemIndex] =
            lisCountRegistry[precedingItemIndex];
        } else if (
          lisLengthRegistry[precedingItemIndex] + 1 ===
          lisLengthRegistry[currentItemIndex]
        ) {
          lisCountRegistry[currentItemIndex] +=
            lisCountRegistry[precedingItemIndex];
        }
      }
    }
    maximumLengthFound = Math.max(
      maximumLengthFound,
      lisLengthRegistry[currentItemIndex],
    );
  }

  let finalLisCount = 0;
  for (
    let resultScanIndex = 0;
    resultScanIndex < totalNumbers;
    resultScanIndex++
  ) {
    if (lisLengthRegistry[resultScanIndex] === maximumLengthFound) {
      finalLisCount += lisCountRegistry[resultScanIndex];
    }
  }

  return finalLisCount;
};
