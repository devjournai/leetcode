/**
 * Max Chunks To Make Sorted II
 * Intuition: After sorting each chunk independently, the whole array is sorted iff every prefix max is ≤ the min of the remaining suffix. Count those split points.
 * Approach: 1. Empty array → 0. 2. Build `maxPrefixValues` left-to-right and `minSuffixValues` right-to-left. 3. For each `splitIndex` in `0..n-2`, if `maxPrefixValues[splitIndex] <= minSuffixValues[splitIndex + 1]`, increment `chunkCounter` (starts at 1). Return `chunkCounter`.
 * Dry Run: arr = [2,1,3,4,4].
 *   - Prefix max [2,2,3,4,4], suffix min [1,1,3,4,4].
 *   - After 0: 2 ≰ 1. After 1: 2 ≤ 3. After 2: 3 ≤ 4. After 3: 4 ≤ 4. Three valid splits → return 4.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxChunksToSorted = function (arr) {
  const arraySize = arr.length;
  if (arraySize === 0) {
    return 0;
  }

  const maxPrefixValues = new Array(arraySize);
  maxPrefixValues[0] = arr[0];
  for (let frontIndex = 1; frontIndex < arraySize; frontIndex++) {
    maxPrefixValues[frontIndex] = Math.max(
      maxPrefixValues[frontIndex - 1],
      arr[frontIndex]
    );
  }

  const minSuffixValues = new Array(arraySize);
  minSuffixValues[arraySize - 1] = arr[arraySize - 1];
  for (let backIndex = arraySize - 2; backIndex >= 0; backIndex--) {
    minSuffixValues[backIndex] = Math.min(
      minSuffixValues[backIndex + 1],
      arr[backIndex]
    );
  }

  let chunkCounter = 1;
  for (let splitIndex = 0; splitIndex < arraySize - 1; splitIndex++) {
    const currentMaxLeft = maxPrefixValues[splitIndex];
    const nextMinRight = minSuffixValues[splitIndex + 1];
    if (currentMaxLeft <= nextMinRight) {
      chunkCounter++;
    }
  }

  return chunkCounter;
};
