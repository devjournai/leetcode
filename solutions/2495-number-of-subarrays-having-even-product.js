/**
 * Number Of Subarrays Having Even Product
 * Intuition: A subarray has an even product if it contains at least one even number. We can count these directly by iterating through the array and, for each element, determining how many valid subarrays ending at that position have an even product.
 * Approach: 1. Initialize 'evenSubarrayTotal' to 0 and 'lastEvenIndexPosition' to -1 (indicating no even number found yet). 2. Iterate through the input array 'nums' with 'currentIndex' from 0 to 'numsLength - 1'. 3. If the number at 'nums[currentIndex]' is even, update 'lastEvenIndexPosition' to 'currentIndex'. All subarrays ending at 'currentIndex' (from index 0 to 'currentIndex') will necessarily include 'nums[currentIndex]' and thus have an even product. Add 'currentIndex + 1' to 'evenSubarrayTotal'. 4. If the number at 'nums[currentIndex]' is odd, and an even number has been encountered previously ('lastEvenIndexPosition' is not -1), then any subarray ending at 'currentIndex' that starts at or before 'lastEvenIndexPosition' will include that prior even number. Add 'lastEvenIndexPosition + 1' to 'evenSubarrayTotal'. 5. After the loop completes, 'evenSubarrayTotal' will hold the total count of subarrays with an even product.
 * Dry Run: nums = [1, 2, 3, 4]
 *   numsLength = 4
 *   evenSubarrayTotal = 0
 *   lastEvenIndexPosition = -1
 *
 *   currentIndex = 0, nums[0] = 1 (odd):
 *     lastEvenIndexPosition is -1.
 *     evenSubarrayTotal remains 0.
 *
 *   currentIndex = 1, nums[1] = 2 (even):
 *     lastEvenIndexPosition becomes 1.
 *     evenSubarrayTotal += (1 + 1) = 2. (Subarrays: [2], [1,2])
 *
 *   currentIndex = 2, nums[2] = 3 (odd):
 *     lastEvenIndexPosition is 1 (not -1).
 *     evenSubarrayTotal += (1 + 1) = 2. (Subarrays: [1,2,3], [2,3])
 *     evenSubarrayTotal becomes 2 + 2 = 4.
 *
 *   currentIndex = 3, nums[3] = 4 (even):
 *     lastEvenIndexPosition becomes 3.
 *     evenSubarrayTotal += (3 + 1) = 4. (Subarrays: [4], [3,4], [2,3,4], [1,2,3,4])
 *     evenSubarrayTotal becomes 4 + 4 = 8.
 *
 *   End of loop. Return evenSubarrayTotal = 8.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var evenProduct = function (nums) {
  const numsLength = nums.length;
  let evenSubarrayTotal = 0;
  let lastEvenIndexPosition = -1;

  for (let currentIndex = 0; currentIndex < numsLength; currentIndex++) {
    if (nums[currentIndex] % 2 === 0) {
      lastEvenIndexPosition = currentIndex;
    }
    if (lastEvenIndexPosition !== -1) {
      evenSubarrayTotal += lastEvenIndexPosition + 1;
    }
  }

  return evenSubarrayTotal;
};
