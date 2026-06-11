/**
 * Partition Array Such That Maximum Difference Is K
 * Intuition: Sorting the array allows for a greedy approach. By processing elements in ascending order, we can effectively determine the maximum number of elements that can form a valid subsequence starting from a minimum value. When an element exceeds the allowed difference 'k' from the current subsequence's minimum, we are forced to start a new subsequence with that element as its new minimum.
 * Approach: 1. Sort the input array `nums` in non-decreasing order. 2. Initialize a counter for the number of subsequences required, starting with `1` as there will always be at least one subsequence. 3. Set the `currentMinimumValue` for the initial subsequence to the first element of the sorted array. 4. Iterate through the sorted array starting from the second element. 5. In each iteration, if the difference between the current element and the `currentMinimumValue` is greater than `k`, it signifies that the current element cannot be part of the ongoing subsequence. A new subsequence must be started; increment the subsequence counter and update `currentMinimumValue` to the current element. 6. Return the final count of subsequences.
 * Dry Run: nums = [3,6,1,2,5], k = 2
 * 1. Sort `nums`: `inputNumbers` becomes `[1,2,3,5,6]`.
 * 2. Initialize `subsequenceCount = 1`.
 * 3. Set `currentMinimumValue = inputNumbers[0] = 1`.
 * 4. Loop `loopIndex` from `1` to `4`:
 *    - `loopIndex = 1`: `inputNumbers[1]` is `2`.
 *      `inputNumbers[1] - currentMinimumValue` (2 - 1) is `1`.
 *      Is `1 > kValue` (1 > 2)? No.
 *    - `loopIndex = 2`: `inputNumbers[2]` is `3`.
 *      `inputNumbers[2] - currentMinimumValue` (3 - 1) is `2`.
 *      Is `2 > kValue` (2 > 2)? No.
 *    - `loopIndex = 3`: `inputNumbers[3]` is `5`.
 *      `inputNumbers[3] - currentMinimumValue` (5 - 1) is `4`.
 *      Is `4 > kValue` (4 > 2)? Yes.
 *        Increment `subsequenceCount` to `2`.
 *        Update `currentMinimumValue = inputNumbers[3] = 5`.
 *    - `loopIndex = 4`: `inputNumbers[4]` is `6`.
 *      `inputNumbers[4] - currentMinimumValue` (6 - 5) is `1`.
 *      Is `1 > kValue` (1 > 2)? No.
 * 5. Loop finishes.
 * 6. Return `subsequenceCount` which is `2`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var partitionArray = function (nums, k) {
  nums.sort((firstNum, secondNum) => firstNum - secondNum);

  let subsequenceCount = 1;
  let currentMinimumValue = nums[0];

  for (let loopIndex = 1; loopIndex < nums.length; loopIndex++) {
    if (nums[loopIndex] - currentMinimumValue > k) {
      subsequenceCount++;
      currentMinimumValue = nums[loopIndex];
    }
  }

  return subsequenceCount;
};
