/**
 * Subarrays Distinct Element Sum Of Squares I
 * Intuition: The problem requires calculating the sum of squares of distinct counts for all possible contiguous subarrays. A straightforward approach is to iterate through all subarrays, determine their distinct count using a hash set, and then sum the squares of these counts.
 * Approach: 1. Initialize a variable `totalSumOfSquares` to zero to accumulate the final result. 2. Use an outer loop with `startIndex` iterating from the beginning of the `nums` array to its end. This `startIndex` marks the beginning of each subarray. 3. Inside the outer loop, initialize a new `Set` called `uniqueElementsTracker` for each `startIndex`. This set will track distinct elements for the current subarray starting at `startIndex`. 4. Use an inner loop with `endIndex` iterating from `startIndex` to the end of the `nums` array. This `endIndex` marks the current end of the subarray. 5. In each iteration of the inner loop, add `nums[endIndex]` to the `uniqueElementsTracker` set. 6. Get the current number of distinct elements, which is `uniqueElementsTracker.size`. Square this count and add it to `totalSumOfSquares`. 7. After all loops complete, `totalSumOfSquares` will hold the required sum.
 * Dry Run: nums = [1, 2, 1]
 * totalSumOfSquares = 0
 *
 * startIndex = 0:
 *   uniqueElementsTracker = {}
 *   endIndex = 0: nums[0] = 1. uniqueElementsTracker.add(1) -> {1}. currentDistinctCount = 1. totalSumOfSquares += 1*1 = 1.
 *   endIndex = 1: nums[1] = 2. uniqueElementsTracker.add(2) -> {1, 2}. currentDistinctCount = 2. totalSumOfSquares += 2*2 = 4. totalSumOfSquares = 1 + 4 = 5.
 *   endIndex = 2: nums[2] = 1. uniqueElementsTracker.add(1) -> {1, 2}. currentDistinctCount = 2. totalSumOfSquares += 2*2 = 4. totalSumOfSquares = 5 + 4 = 9.
 *
 * startIndex = 1:
 *   uniqueElementsTracker = {}
 *   endIndex = 1: nums[1] = 2. uniqueElementsTracker.add(2) -> {2}. currentDistinctCount = 1. totalSumOfSquares += 1*1 = 1. totalSumOfSquares = 9 + 1 = 10.
 *   endIndex = 2: nums[2] = 1. uniqueElementsTracker.add(1) -> {2, 1}. currentDistinctCount = 2. totalSumOfSquares += 2*2 = 4. totalSumOfSquares = 10 + 4 = 14.
 *
 * startIndex = 2:
 *   uniqueElementsTracker = {}
 *   endIndex = 2: nums[2] = 1. uniqueElementsTracker.add(1) -> {1}. currentDistinctCount = 1. totalSumOfSquares += 1*1 = 1. totalSumOfSquares = 14 + 1 = 15.
 *
 * Return 15.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var sumCounts = function (nums) {
  let totalSumOfSquares = 0;

  for (let startIndex = 0; startIndex < nums.length; startIndex++) {
    const uniqueElementsTracker = new Set();
    for (let endIndex = startIndex; endIndex < nums.length; endIndex++) {
      uniqueElementsTracker.add(nums[endIndex]);
      const currentDistinctCount = uniqueElementsTracker.size;
      totalSumOfSquares += currentDistinctCount * currentDistinctCount;
    }
  }

  return totalSumOfSquares;
};
