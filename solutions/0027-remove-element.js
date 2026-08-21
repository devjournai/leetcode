/**
 * Remove Element
 * Intuition: Compact keepers to the front: whenever `nums[iteratePointer]` is not `val`, write it at `writePointer` and advance the write index.
 * Approach: 1. Initialize `writePointer` and `iteratePointer` to 0. 2. Scan the array. 3. On a keep, copy to `writePointer` and increment it. 4. Always increment `iteratePointer`. 5. Return `writePointer` as the new length.
 * Dry Run: nums = [3, 2, 2, 3], val = 3.
 *   - 3 skip; 2 write at 0; 2 write at 1; 3 skip. Return 2 (nums starts [2,2,...]).
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var removeElement = function (nums, val) {
  let writePointer = 0;
  let iteratePointer = 0;
  let arrayLength = nums.length;

  while (iteratePointer < arrayLength) {
    if (nums[iteratePointer] !== val) {
      nums[writePointer] = nums[iteratePointer];
      writePointer++;
    }
    iteratePointer++;
  }

  return writePointer;
};
