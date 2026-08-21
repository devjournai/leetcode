/**
 * Number Of Valid Subarrays
 * Intuition: A subarray is valid when its leftmost value is the minimum. For each start i, the valid ends run until the next strictly smaller element, which a monotonic increasing stack finds in linear time.
 * Approach: 1. Scan left to right, keeping increasing indices on a stack. 2. When nums[j] is smaller than the top, pop i and add j-i valid subarrays starting at i. 3. After the scan, remaining indices extend to n.
 * Dry Run: nums=[1,4,2,5,3]. 1 is min through the end (5 subarrays). 4 lasts until 2 (1). 2 lasts until 3’s pop or n. Total 11.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var validSubarrays = function (nums) {
  const lengthOfNums = nums.length;
  const indexTracker = [];
  let subarraysTotal = 0;

  let currentPosition = 0;
  while (currentPosition < lengthOfNums) {
    while (
      indexTracker.length > 0 &&
      nums[indexTracker[indexTracker.length - 1]] > nums[currentPosition]
    ) {
      const poppedPosition = indexTracker.pop();
      subarraysTotal += currentPosition - poppedPosition;
    }
    indexTracker.push(currentPosition);
    currentPosition++;
  }

  while (indexTracker.length > 0) {
    const remainingIndex = indexTracker.pop();
    subarraysTotal += lengthOfNums - remainingIndex;
  }

  return subarraysTotal;
};
