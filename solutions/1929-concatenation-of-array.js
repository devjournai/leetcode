/**
 * Concatenation Of Array
 * Intuition: The answer is `nums` written twice, so a result array of length `2n` can copy `nums[i]` into both index `i` and index `i+n` in one pass.
 * Approach: 1. Allocate `resultContainer` of size `2 * n`. 2. For each `currentIdx`, set `resultContainer[currentIdx]` and `resultContainer[currentIdx + n]` to `nums[currentIdx]`. 3. Return the array.
 * Dry Run: nums = [1, 2, 1], n=3.
 *   - i=0 → [1, _, _, 1, _, _]
 *   - i=1 → [1, 2, _, 1, 2, _]
 *   - i=2 → [1, 2, 1, 1, 2, 1]
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getConcatenation = function (nums) {
  const arrayLength = nums.length;
  const resultContainer = new Array(arrayLength * 2);

  for (let currentIdx = 0; currentIdx < arrayLength; currentIdx++) {
    resultContainer[currentIdx] = nums[currentIdx];
    resultContainer[currentIdx + arrayLength] = nums[currentIdx];
  }

  return resultContainer;
};
