/**
 * Maximum Ascending Subarray Sum
 * Intuition: An ascending subarray is a strictly increasing consecutive run. Reset the running sum when the increase breaks and keep the global max.
 * Approach: 1. Seed `greatestSumEver` and `currentAscendingTotal` with nums[0]. 2. If nums[i] > nums[i-1], add nums[i]; else restart at nums[i]. 3. Track the max after each step. 4. Return `greatestSumEver`.
 * Dry Run: nums = [10,20,30,5,10,50].
 *   - 10+20+30=60, reset at 5, then 5+10+50=65. Return 65.
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
