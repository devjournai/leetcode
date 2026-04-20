/**
 * Maximum Ascending Subarray Sum
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxAscendingSum = function (nums) {
  let arrayLength = nums.length;
  let greatestSumEver = nums[0];
  let currentAscendingTotal = nums[0];

  for (
    let currentPosition = 1;
    currentPosition < arrayLength;
    currentPosition++
  ) {
    if (nums[currentPosition] > nums[currentPosition - 1]) {
      currentAscendingTotal = currentAscendingTotal + nums[currentPosition];
    } else {
      currentAscendingTotal = nums[currentPosition];
    }
    greatestSumEver = Math.max(greatestSumEver, currentAscendingTotal);
  }

  return greatestSumEver;
};
