/**
 * Remove Duplicates From Sorted Array II
 * Intuition: In a sorted array, a value is allowed at most twice, so a write index can copy nums[read] only when it differs from nums[write-2].
 * Approach: 1. If length ≤ 2, return it. 2. Start write and read at 2. 3. When nums[read] !== nums[write-2], copy it forward and increment write. 4. Return write as the new length.
 * Dry Run: [1,1,1,2,2,3] → skip third 1 (equals write-2), keep both 2s and 3 → [1,1,2,2,3], length 5
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var removeDuplicates = function (nums) {
  const totalLength = nums.length;

  if (totalLength <= 2) {
    return totalLength;
  }

  let nextWritePosition = 2;
  let currentReadPosition = 2;

  while (currentReadPosition < totalLength) {
    if (nums[currentReadPosition] !== nums[nextWritePosition - 2]) {
      nums[nextWritePosition] = nums[currentReadPosition];
      nextWritePosition++;
    }
    currentReadPosition++;
  }

  return nextWritePosition;
};
