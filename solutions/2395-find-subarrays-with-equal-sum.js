/**
 * Find Subarrays With Equal Sum
 * Intuition: If we find a sum of two consecutive elements that we have seen before, it means there are two distinct subarrays of length 2 with the same sum.
 * Approach: 1. Initialize an empty Set to store unique sums of subarrays of length 2. 2. Iterate through the input array from the first element up to the second-to-last element. 3. For each iteration, calculate the sum of the current element and the next element. 4. Check if this calculated sum already exists in the Set. If it does, return true immediately as we've found two subarrays with equal sums. 5. If the sum is not in the Set, add it to the Set. 6. If the loop completes without finding any duplicate sums, return false.
 * Dry Run: nums = [4,2,4]
 * 1. Initialize `storedSums` as new Set().
 * 2. `scanIndex` = 0. `scanIndex` < `nums.length - 1` (0 < 2) is true.
 *    `currentPairSum` = `nums[0]` + `nums[1]` = 4 + 2 = 6.
 *    `storedSums.has(6)` is false.
 *    `storedSums.add(6)`. `storedSums` = {6}.
 *    `scanIndex` becomes 1.
 * 3. `scanIndex` = 1. `scanIndex` < `nums.length - 1` (1 < 2) is true.
 *    `currentPairSum` = `nums[1]` + `nums[2]` = 2 + 4 = 6.
 *    `storedSums.has(6)` is true.
 *    Return true.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findSubarrays = function (nums) {
  const storedSums = new Set();
  let scanIndex = 0;

  while (scanIndex < nums.length - 1) {
    const currentPairSum = nums[scanIndex] + nums[scanIndex + 1];

    if (storedSums.has(currentPairSum)) {
      return true;
    }

    storedSums.add(currentPairSum);
    scanIndex++;
  }

  return false;
};
