/**
 * Binary Searchable Numbers In An Unsorted Array
 * Intuition: For a number `nums[i]` to be binary searchable, it must behave like an element in a sorted array relative to all other elements. This means all elements to its left must be strictly smaller than `nums[i]`, and all elements to its right must be strictly larger than `nums[i]`. If this condition holds, no matter which element is chosen as a pivot (other than `nums[i]` itself), `nums[i]` will remain in the relevant subsegment.
 * Approach: 1. Calculate a `prefixMaximums` array where `prefixMaximums[j]` stores the maximum value encountered from `nums[0]` to `nums[j]`. 2. Calculate a `suffixMinimums` array where `suffixMinimums[j]` stores the minimum value encountered from `nums[j]` to `nums[n-1]`. 3. Iterate through the original `nums` array. For each `nums[k]`, check if `max(nums[0...k-1]) < nums[k]` AND `nums[k] < min(nums[k+1...n-1])`. These left and right bounds can be efficiently obtained from the `prefixMaximums` and `suffixMinimums` arrays, treating boundary conditions (index 0 and index n-1) with -Infinity and +Infinity respectively. 4. Increment a counter for each `nums[k]` that satisfies the condition.
 * Dry Run: nums = [1, 3, 2, 4]
 * arrayLength = 4
 *
 * 1. prefixMaximums calculation:
 *    prefixMaximums = [0, 0, 0, 0] (initialization placeholder)
 *    prefixMaximums[0] = nums[0] = 1
 *    leftScanIdx = 1: prefixMaximums[1] = Math.max(prefixMaximums[0], nums[1]) = Math.max(1, 3) = 3
 *    leftScanIdx = 2: prefixMaximums[2] = Math.max(prefixMaximums[1], nums[2]) = Math.max(3, 2) = 3
 *    leftScanIdx = 3: prefixMaximums[3] = Math.max(prefixMaximums[2], nums[3]) = Math.max(3, 4) = 4
 *    prefixMaximums = [1, 3, 3, 4]
 *
 * 2. suffixMinimums calculation:
 *    suffixMinimums = [0, 0, 0, 0] (initialization placeholder)
 *    suffixMinimums[3] = nums[3] = 4
 *    rightScanIdx = 2: suffixMinimums[2] = Math.min(suffixMinimums[3], nums[2]) = Math.min(4, 2) = 2
 *    rightScanIdx = 1: suffixMinimums[1] = Math.min(suffixMinimums[2], nums[1]) = Math.min(2, 3) = 2
 *    rightScanIdx = 0: suffixMinimums[0] = Math.min(suffixMinimums[1], nums[0]) = Math.min(2, 1) = 1
 *    suffixMinimums = [1, 2, 2, 4]
 *
 * 3. Count searchable numbers:
 *    finalCount = 0
 *    currentElementIdx = 0 (nums[0] = 1):
 *      maxToLeft = -Infinity (as currentElementIdx is 0)
 *      minToRight = suffixMinimums[1] = 2 (as currentElementIdx < arrayLength - 1)
 *      Condition: -Infinity < 1 && 1 < 2 -> true. finalCount = 1.
 *    currentElementIdx = 1 (nums[1] = 3):
 *      maxToLeft = prefixMaximums[0] = 1
 *      minToRight = suffixMinimums[2] = 2
 *      Condition: 1 < 3 && 3 < 2 -> false. finalCount remains 1.
 *    currentElementIdx = 2 (nums[2] = 2):
 *      maxToLeft = prefixMaximums[1] = 3
 *      minToRight = suffixMinimums[3] = 4
 *      Condition: 3 < 2 && 2 < 4 -> false. finalCount remains 1.
 *    currentElementIdx = 3 (nums[3] = 4):
 *      maxToLeft = prefixMaximums[2] = 3
 *      minToRight = +Infinity (as currentElementIdx is arrayLength - 1)
 *      Condition: 3 < 4 && 4 < Infinity -> true. finalCount = 2.
 *
 * Result: 2
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var binarySearchableNumbers = function (nums) {
  const arrayLength = nums.length;
  const prefixMaximums = new Array(arrayLength);
  const suffixMinimums = new Array(arrayLength);

  prefixMaximums[0] = nums[0];
  for (let leftScanIdx = 1; leftScanIdx < arrayLength; leftScanIdx++) {
    prefixMaximums[leftScanIdx] = Math.max(
      prefixMaximums[leftScanIdx - 1],
      nums[leftScanIdx]
    );
  }

  suffixMinimums[arrayLength - 1] = nums[arrayLength - 1];
  for (let rightScanIdx = arrayLength - 2; rightScanIdx >= 0; rightScanIdx--) {
    suffixMinimums[rightScanIdx] = Math.min(
      suffixMinimums[rightScanIdx + 1],
      nums[rightScanIdx]
    );
  }

  let finalCount = 0;

  for (
    let currentElementIdx = 0;
    currentElementIdx < arrayLength;
    currentElementIdx++
  ) {
    const maxToLeft =
      currentElementIdx > 0 ? prefixMaximums[currentElementIdx - 1] : -Infinity;
    const minToRight =
      currentElementIdx < arrayLength - 1
        ? suffixMinimums[currentElementIdx + 1]
        : Infinity;

    if (
      maxToLeft < nums[currentElementIdx] &&
      nums[currentElementIdx] < minToRight
    ) {
      finalCount++;
    }
  }

  return finalCount;
};
