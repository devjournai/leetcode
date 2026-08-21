/**
 * Wiggle Sort II
 * Intuition: After sorting, interleave the smaller half (from its end) on even indices and the larger half (from its end) on odd indices so neighbors satisfy nums[even] < nums[odd] > nums[even+1] even with duplicates.
 * Approach: 1. Sort nums ascending and copy to an auxiliary array. 2. medianSplitIndex = floor((n - 1) / 2). 3. Walk targetIndex 0..n-1: even slots take from the small half pointer (decrementing), odd slots from the large half pointer (decrementing). 4. Write back into nums in place.
 * Dry Run: nums = [1, 5, 1, 1, 6, 4].
 *   - Sorted copy [1, 1, 1, 4, 5, 6]; small pointer 2, large pointer 5.
 *   - Fill [1, 6, 1, 5, 1, 4].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var wiggleSort = function (nums) {
  nums.sort((valueA, valueB) => valueA - valueB);

  const originalArrayLength = nums.length;
  const auxiliarySortedArray = [...nums];

  const medianSplitIndex = Math.floor((originalArrayLength - 1) / 2);

  let currentSmallHalfPointer = medianSplitIndex;
  let currentLargeHalfPointer = originalArrayLength - 1;

  for (let targetIndex = 0; targetIndex < originalArrayLength; targetIndex++) {
    if (targetIndex % 2 === 0) {
      nums[targetIndex] = auxiliarySortedArray[currentSmallHalfPointer];
      currentSmallHalfPointer--;
    } else {
      nums[targetIndex] = auxiliarySortedArray[currentLargeHalfPointer];
      currentLargeHalfPointer--;
    }
  }
};
