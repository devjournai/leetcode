/**
 * Find Indices With Index And Value Difference I
 * Intuition: The problem requires finding any pair of indices (i, j) that satisfy two conditions involving absolute differences of indices and their corresponding values. A straightforward approach is to iterate through all possible pairs of indices and check these conditions.
 * Approach: 1. Initialize an outer loop with a counter `firstIndex` from `0` to `n-1`, where `n` is the length of the `nums` array. 2. Initialize an inner loop with a counter `secondIndex` from `firstIndex` to `n-1`. This covers all unique pairs `(i, j)` where `i <= j`. 3. Inside the inner loop, calculate the absolute difference between `firstIndex` and `secondIndex`. 4. Also calculate the absolute difference between `nums[firstIndex]` and `nums[secondIndex]`. 5. Check if both calculated differences meet or exceed the given `indexDifference` and `valueDifference` respectively. 6. If both conditions are satisfied, return the pair `[firstIndex, secondIndex]`. 7. If the loops complete without finding such a pair, return `[-1, -1]`.
 * Dry Run: nums = [5,1,4,12], indexDifference = 2, valueDifference = 4
 *   totalElements = 4
 *   firstIndex = 0 (nums[0] = 5)
 *     secondIndex = 0: abs(0-0)=0 < 2. Conditions not met.
 *     secondIndex = 1: abs(0-1)=1 < 2. Conditions not met.
 *     secondIndex = 2 (nums[2] = 4):
 *       indexDiffCheck = abs(0-2) = 2. 2 >= indexDifference (2) -> True.
 *       valueDiffCheck = abs(nums[0]-nums[2]) = abs(5-4) = 1. 1 >= valueDifference (4) -> False. Conditions not met.
 *     secondIndex = 3 (nums[3] = 12):
 *       indexDiffCheck = abs(0-3) = 3. 3 >= indexDifference (2) -> True.
 *       valueDiffCheck = abs(nums[0]-nums[3]) = abs(5-12) = 7. 7 >= valueDifference (4) -> True.
 *       Both conditions met. Return [0, 3].
 * Time Complexity: O(n^2)
 * Space Complexity: O(1
 */
var findIndices = function (nums, indexDifference, valueDifference) {
  const totalElements = nums.length;

  for (let firstIndex = 0; firstIndex < totalElements; firstIndex++) {
    for (
      let secondIndex = firstIndex;
      secondIndex < totalElements;
      secondIndex++
    ) {
      if (
        Math.abs(firstIndex - secondIndex) >= indexDifference &&
        Math.abs(nums[firstIndex] - nums[secondIndex]) >= valueDifference
      ) {
        return [firstIndex, secondIndex];
      }
    }
  }

  return [-1, -1];
};
