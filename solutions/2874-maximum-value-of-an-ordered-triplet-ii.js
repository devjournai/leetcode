/**
 * Maximum Value Of An Ordered Triplet Ii
 * Intuition: The problem asks to maximize (nums[i] - nums[j]) * nums[k] for i < j < k. This can be optimized by observing that for a fixed 'k', we need to maximize (nums[i] - nums[j]) for i < j < k. This subproblem can be further optimized by realizing that for a fixed 'j', we need to maximize nums[i] for i < j. By iterating through the array once and maintaining the maximum element seen so far (for 'i') and the maximum difference (nums[i] - nums[j]) seen so far (for 'j'), we can efficiently compute the maximum triplet value (for 'k').
 * Approach: 1. Initialize `maxOverallTripletResult` to negative infinity to correctly capture potentially negative maximum values. 2. Initialize `maxElementPriorToJ` to `nums[0]` as the maximum `nums[i]` encountered before any `j` (or `k`). 3. Initialize `maxDifferencePriorToK` to negative infinity, representing the maximum `(nums[i] - nums[j])` encountered for `i < j` before any `k`. 4. Iterate `currentKIndex` from 1 to `nums.length - 1`. 5. In each iteration, update `maxOverallTripletResult` by considering `(maxDifferencePriorToK * nums[currentKIndex])`. This uses the `max(nums[i]-nums[j])` from `i<j<currentKIndex` and multiplies it by `nums[currentKIndex]`. 6. Update `maxDifferencePriorToK` by considering `(maxElementPriorToJ - nums[currentKIndex])`. This calculates `max(nums[i]) - nums[currentKIndex]` where `i < currentKIndex`, effectively finding a new `max(nums[i] - nums[j])` where `j = currentKIndex`. 7. Update `maxElementPriorToJ` by considering `nums[currentKIndex]`, so it keeps track of the maximum element seen up to `currentKIndex`. 8. After the loop, return `Math.max(0, maxOverallTripletResult)` to satisfy the condition of returning 0 if all triplets have negative values.
 * Dry Run: nums = [1, 2, 3, -10]
 * Initial: `maxOverallTripletResult = -Infinity`, `maxElementPriorToJ = 1`, `maxDifferencePriorToK = -Infinity`
 *
 * Loop `currentKIndex = 1` (nums[1] = 2):
 * 1. `maxOverallTripletResult = Math.max(-Infinity, -Infinity * 2) = -Infinity` (no valid triplet yet as k=1 implies no i < j < k)
 * 2. `maxDifferencePriorToK = Math.max(-Infinity, 1 - 2) = -1` (This captures nums[0]-nums[1])
 * 3. `maxElementPriorToJ = Math.max(1, 2) = 2`
 *
 * Loop `currentKIndex = 2` (nums[2] = 3):
 * 1. `maxOverallTripletResult = Math.max(-Infinity, -1 * 3) = -3` (This is (nums[0]-nums[1])*nums[2])
 * 2. `maxDifferencePriorToK = Math.max(-1, 2 - 3) = -1` (This means max((nums[0]-nums[1]), (max(nums[0],nums[1])-nums[2])))
 * 3. `maxElementPriorToJ = Math.max(2, 3) = 3`
 *
 * Loop `currentKIndex = 3` (nums[3] = -10):
 * 1. `maxOverallTripletResult = Math.max(-3, -1 * -10) = Math.max(-3, 10) = 10` (This is max((nums[0]-nums[1])*nums[3], (nums[1]-nums[2])*nums[3]))
 * 2. `maxDifferencePriorToK = Math.max(-1, 3 - (-10)) = Math.max(-1, 13) = 13`
 * 3. `maxElementPriorToJ = Math.max(3, -10) = 3`
 *
 * End of loop.
 * Return `Math.max(0, 10) = 10`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumTripletValue = function (nums) {
  let maxOverallTripletResult = -Infinity;
  let maxElementPriorToJ = nums[0];
  let maxDifferencePriorToK = -Infinity;

  for (let currentKIndex = 1; currentKIndex < nums.length; currentKIndex++) {
    maxOverallTripletResult = Math.max(
      maxOverallTripletResult,
      maxDifferencePriorToK * nums[currentKIndex]
    );
    maxDifferencePriorToK = Math.max(
      maxDifferencePriorToK,
      maxElementPriorToJ - nums[currentKIndex]
    );
    maxElementPriorToJ = Math.max(maxElementPriorToJ, nums[currentKIndex]);
  }

  return Math.max(0, maxOverallTripletResult);
};
