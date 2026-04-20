/**
 * Non Decreasing Array
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
