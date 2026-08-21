/**
 * Non Decreasing Array
 * Intuition: At most one decrease may be fixed. Prefer lowering nums[i] to nums[i+1] unless nums[i-1] > nums[i+1], in which case raise nums[i+1] instead.
 * Approach: 1. Scan adjacent pairs. 2. On a decrease, increment `violationCounter` and fail if > 1. 3. If a previous element exists and is > next, set `nums[i+1]=nums[i]`; else set `nums[i]=nums[i+1]`.
 * Dry Run: nums=[4,2,3].
 *   - 4>2, no previous, set nums[0]=2 → [2,2,3]. One violation, rest non-decreasing → true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var checkPossibility = function (nums) {
  let violationCounter = 0;
  const arrayLength = nums.length;

  for (
    let currentElementIndex = 0;
    currentElementIndex < arrayLength - 1;
    currentElementIndex++
  ) {
    const valueAtCurrent = nums[currentElementIndex];
    const valueAtNext = nums[currentElementIndex + 1];

    if (valueAtCurrent > valueAtNext) {
      violationCounter++;

      if (violationCounter > 1) {
        return false;
      }

      const hasPrecedingElement = currentElementIndex > 0;
      const valueAtPreceding = hasPrecedingElement
        ? nums[currentElementIndex - 1]
        : -Infinity;

      if (hasPrecedingElement && valueAtPreceding > valueAtNext) {
        nums[currentElementIndex + 1] = valueAtCurrent;
      } else {
        nums[currentElementIndex] = valueAtNext;
      }
    }
  }

  return true;
};
