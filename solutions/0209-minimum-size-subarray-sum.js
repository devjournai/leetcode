/**
 * Minimum Size Subarray Sum
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var minSubArrayLen = function (targetValue, numberArray) {
  let minimumLengthAchieved = Infinity;
  let currentSumAccumulator = 0;
  let windowLeftIndex = 0;

  for (let windowRightIndex = 0; windowRightIndex < numberArray.length; windowRightIndex++) {
    currentSumAccumulator += numberArray[windowRightIndex];

    while (currentSumAccumulator >= targetValue) {
      const currentWindowLength = windowRightIndex - windowLeftIndex + 1;
      minimumLengthAchieved = Math.min(minimumLengthAchieved, currentWindowLength);
      currentSumAccumulator -= numberArray[windowLeftIndex];
      windowLeftIndex++;
    }
  }

  return minimumLengthAchieved === Infinity ? 0 : minimumLengthAchieved;
};