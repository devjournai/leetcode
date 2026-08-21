/**
 * Find All Duplicates In An Array
 * Intuition: Values are 1..n, so value v marks index v-1 by negating it. A second visit to an already-negative slot means v is a duplicate.
 * Approach: 1. For each `nums[i]`, `targetAbsoluteIndex = abs(val)-1`. 2. If that slot is negative, push `abs(val)`. 3. Else multiply it by -1. 4. Return `duplicateNumbers`.
 * Dry Run: [4,3,2,7,8,2,3,1]. First 2 marks index 1; second 2 sees negatives → 2. Same for 3. Return [2,3].
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findDuplicates = function (nums) {
  const duplicateNumbers = [];
  const arrayLength = nums.length;

  for (let loopIndex = 0; loopIndex < arrayLength; loopIndex++) {
    const currentElementValue = nums[loopIndex];
    const targetAbsoluteIndex = Math.abs(currentElementValue) - 1;
    const valueAtIndex = nums[targetAbsoluteIndex];

    if (valueAtIndex < 0) {
      duplicateNumbers.push(Math.abs(currentElementValue));
    } else {
      nums[targetAbsoluteIndex] *= -1;
    }
  }

  return duplicateNumbers;
};
