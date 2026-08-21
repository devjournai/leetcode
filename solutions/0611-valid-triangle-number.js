/**
 * Valid Triangle Number
 * Intuition: After sorting, three sides a≤b≤c form a triangle iff a+b>c. Fix two smaller indices and advance a third pointer while the inequality holds so each pair contributes a contiguous count of valid c values.
 * Approach: 1. If `numItems < 3` return 0. 2. Sort `nums` ascending. 3. For `currentOuterIndex`, skip zeros. 4. For each `currentMiddleIndex`, start `thirdPointer` at max(old, middle+1) and while `nums[outer]+nums[middle] > nums[thirdPointer]` increment. 5. Add `thirdPointer - 1 - currentMiddleIndex` to `finalTriangleCount`.
 * Dry Run: nums=[2,2,3,4].
 *   - Sorted same. (2,2,3): 2+2>3 → 1. (2,3,4): 2+3>4 → 1. Another 2 with 3,4 → 1. Total 3.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var triangleNumber = function (nums) {
  let finalTriangleCount = 0;
  const numItems = nums.length;

  if (numItems < 3) {
    return 0;
  }

  nums.sort((firstValue, secondValue) => firstValue - secondValue);

  for (
    let currentOuterIndex = 0;
    currentOuterIndex < numItems - 2;
    currentOuterIndex++
  ) {
    if (nums[currentOuterIndex] === 0) {
      continue;
    }

    let thirdPointer = currentOuterIndex + 2;
    for (
      let currentMiddleIndex = currentOuterIndex + 1;
      currentMiddleIndex < numItems - 1;
      currentMiddleIndex++
    ) {
      thirdPointer = Math.max(thirdPointer, currentMiddleIndex + 1);

      while (
        thirdPointer < numItems &&
        nums[currentOuterIndex] + nums[currentMiddleIndex] > nums[thirdPointer]
      ) {
        thirdPointer++;
      }
      finalTriangleCount += thirdPointer - 1 - currentMiddleIndex;
    }
  }

  return finalTriangleCount;
};
