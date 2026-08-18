/**
 * Find The Number Of Subarrays Where Boundary Elements Are Maximum
 * Intuition: A subarray is valid iff both endpoints equal its maximum. For each right endpoint `r`, the valid left endpoints are the previous occurrences of `nums[r]` that are not blocked by a strictly larger value in between. A monotonic decreasing stack of `[value, consecutiveCount]` counts how many such starts end at `r`.
 * Approach: 1. Scan left to right. 2. Pop stack values smaller than the current number (they can no longer be maxima of a later subarray). 3. If the top equals the current number, increment its count; otherwise push `[num, 1]`. 4. Add the top count to the answer (all those equal-max prefixes plus the singleton).
 * Dry Run:
 * Input: nums = [1,4,3,3,2]
 * 1. 1 -> count 1, ans=1
 * 2. 4 pops 1, count 1, ans=2
 * 3. 3 stays under 4, count 1, ans=3
 * 4. 3 equals top, count 2, ans=5 (subarrays [3] and [3,3])
 * 5. 2, count 1, ans=6
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var numberOfSubarrays = function (nums) {
  const valueAndRunLengthStack = [];
  let validSubarrayCount = 0;

  for (let elementIndex = 0; elementIndex < nums.length; elementIndex++) {
    const currentValue = nums[elementIndex];
    while (
      valueAndRunLengthStack.length > 0 &&
      valueAndRunLengthStack[valueAndRunLengthStack.length - 1][0] <
        currentValue
    ) {
      valueAndRunLengthStack.pop();
    }
    if (
      valueAndRunLengthStack.length === 0 ||
      valueAndRunLengthStack[valueAndRunLengthStack.length - 1][0] !==
        currentValue
    ) {
      valueAndRunLengthStack.push([currentValue, 0]);
    }
    valueAndRunLengthStack[valueAndRunLengthStack.length - 1][1]++;
    validSubarrayCount +=
      valueAndRunLengthStack[valueAndRunLengthStack.length - 1][1];
  }

  return validSubarrayCount;
};
