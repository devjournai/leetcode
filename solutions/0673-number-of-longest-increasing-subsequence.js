/**
 * Number Of Longest Increasing Subsequence
 * Intuition: For each index, the LIS ending there is 1 plus the best strictly smaller predecessor, and the count of such LIS is the sum of counts of those predecessors that achieve that best length.
 * Approach: 1. Fill `lisLengthRegistry` and `lisCountRegistry` with 1. 2. For `currentItemIndex`, scan earlier `precedingItemIndex`; if nums[curr]>nums[prev], set length/count when prevLength+1 is better, else add prevCount when equal. 3. Track `maximumLengthFound`. 4. Sum counts whose length equals that max.
 * Dry Run: nums=[1,3,5,4,7]. After DP lengths [1,2,3,3,4], counts [1,1,1,1,2]. Max length 4 → finalLisCount=2 (1-3-5-7 and 1-3-4-7).
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
      lisLengthRegistry[currentItemIndex]
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
