/**
 * Minimum Pair Removal to Sort Array I
 * Intuition: Each operation replaces the adjacent pair with the globally smallest sum (leftmost on ties) by one merged value, so simulate until the array is non-decreasing.
 * Approach: 1. While the array is not non-decreasing, scan adjacent pairs for the minimum sum. 2. Write that sum at the left index and splice out the right neighbor. 3. Count operations and return.
 * Dry Run: nums = [5, 2, 3, 1]. Min pair is 3+1=4 → [5, 2, 4]. Min pair is 5+2=7 → [7, 4]. Min pair is 7+4=11 → [11]. Sorted after 3 operations.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var minimumPairRemoval = function (nums) {
  let operations = 0;

  function isNonDecreasing(arr) {
    if (arr.length <= 1) {
      return true;
    }
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
  }

  while (!isNonDecreasing(nums)) {
    let minSum = Infinity;
    let minSumIndex = -1;

    for (let i = 0; i < nums.length - 1; i++) {
      const currentSum = nums[i] + nums[i + 1];
      if (currentSum < minSum) {
        minSum = currentSum;
        minSumIndex = i;
      }
    }

    nums[minSumIndex] = minSum;
    nums.splice(minSumIndex + 1, 1);

    operations++;
  }

  return operations;
};
