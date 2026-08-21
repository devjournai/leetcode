/**
 * Remove Duplicates From Sorted Array
 * Intuition: Because the array is sorted, duplicates are adjacent; a `writerIndex` keeps the last unique value while `readerIndex` copies a new value only when it differs.
 * Approach: 1. Return 0 if empty. 2. Start `writerIndex=0`, `readerIndex=1`. 3. When `nums[readerIndex] !== nums[writerIndex]`, increment writer and copy. 4. Always increment reader. 5. Return `writerIndex + 1`.
 * Dry Run: nums = [1, 1, 2].
 *   - reader=1 equal, skip. reader=2 value 2 ≠ 1, writer=1, nums[1]=2. Return 2 (array [1,2,...]).
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var removeDuplicates = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let writerIndex = 0;
  let readerIndex = 1;

  while (readerIndex < nums.length) {
    if (nums[readerIndex] !== nums[writerIndex]) {
      writerIndex++;
      nums[writerIndex] = nums[readerIndex];
    }
    readerIndex++;
  }

  return writerIndex + 1;
};
