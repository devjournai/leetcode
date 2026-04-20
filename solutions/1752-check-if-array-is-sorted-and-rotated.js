/**
 * Check If Array Is Sorted And Rotated
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var check = function (nums) {
  const arrayItemsTotal = nums.length;
  let disorderOccurrences = 0;

  let currentPointer = 0;
  while (currentPointer < arrayItemsTotal - 1) {
    disorderOccurrences += nums[currentPointer] > nums[currentPointer + 1];
    currentPointer++;
  }

  const finalElement = nums[arrayItemsTotal - 1];
  const initialElement = nums[0];

  disorderOccurrences += finalElement > initialElement;

  return disorderOccurrences < 2;
};
