/**
 * Find First And Last Position Of Element In Sorted Array
 * Intuition: Two binary searches: the first keeps looking left after a hit to pin `firstFoundIndex`; the second looks right to pin `lastFoundIndex`.
 * Approach: 1. Search with `leftPointer`/`rightPointer`; on match set `firstFoundIndex` and `rightPointer = mid-1`. 2. Second search with `startBoundary`/`endBoundary`; on match set `lastFoundIndex` and `startBoundary = mid+1`. 3. Return `[firstFoundIndex, lastFoundIndex]` (both stay -1 if missing).
 * Dry Run: nums = [5, 7, 7, 8, 8, 10], target = 8.
 *   - First search lands on a 8 then keeps left → firstFoundIndex=3. Second search keeps right → lastFoundIndex=4. Return [3, 4].
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var searchRange = function (nums, target) {
  let leftPointer = 0;
  let rightPointer = nums.length - 1;
  let firstFoundIndex = -1;

  while (leftPointer <= rightPointer) {
    let currentMidA = Math.floor(
      leftPointer + (rightPointer - leftPointer) / 2
    );
    if (nums[currentMidA] === target) {
      firstFoundIndex = currentMidA;
      rightPointer = currentMidA - 1;
    } else if (nums[currentMidA] < target) {
      leftPointer = currentMidA + 1;
    } else {
      rightPointer = currentMidA - 1;
    }
  }

  let startBoundary = 0;
  let endBoundary = nums.length - 1;
  let lastFoundIndex = -1;

  while (startBoundary <= endBoundary) {
    let currentMidB = Math.floor(
      startBoundary + (endBoundary - startBoundary) / 2
    );
    if (nums[currentMidB] === target) {
      lastFoundIndex = currentMidB;
      startBoundary = currentMidB + 1;
    } else if (nums[currentMidB] < target) {
      startBoundary = currentMidB + 1;
    } else {
      endBoundary = currentMidB - 1;
    }
  }

  let finalPositions = [firstFoundIndex, lastFoundIndex];
  return finalPositions;
};
