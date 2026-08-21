/**
 * Minimum Operations To Make The Array Increasing
 * Intuition: Greedily raise each nums[i] just above the previous enforced value so the array becomes strictly increasing with the fewest increments.
 * Approach: 1. Track `lastStrictlyIncreasingValue = nums[0]`. 2. If nums[i] ≤ last, add (last+1 - nums[i]) operations and set last to last+1. 3. Else set last to nums[i]. 4. Return `totalOperationsCount`.
 * Dry Run: nums = [1,1,1].
 *   - Second becomes 2 (1 op), third becomes 3 (2 ops). Total 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minOperations = function (nums) {
  let totalOperationsCount = 0;
  let lastStrictlyIncreasingValue = nums[0];
  let arrayLength = nums.length;

  for (
    let currentElementIndex = 1;
    currentElementIndex < arrayLength;
    currentElementIndex++
  ) {
    let currentElementValue = nums[currentElementIndex];

    if (currentElementValue <= lastStrictlyIncreasingValue) {
      let targetValueForCurrent = lastStrictlyIncreasingValue + 1;
      totalOperationsCount += targetValueForCurrent - currentElementValue;
      lastStrictlyIncreasingValue = targetValueForCurrent;
    } else {
      lastStrictlyIncreasingValue = currentElementValue;
    }
  }

  return totalOperationsCount;
};
