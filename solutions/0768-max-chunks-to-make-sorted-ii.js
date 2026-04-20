/**
 * Max Chunks To Make Sorted II
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
      arr[frontIndex],
    );
  }

  const minSuffixValues = new Array(arraySize);
  minSuffixValues[arraySize - 1] = arr[arraySize - 1];
  for (let backIndex = arraySize - 2; backIndex >= 0; backIndex--) {
    minSuffixValues[backIndex] = Math.min(
      minSuffixValues[backIndex + 1],
      arr[backIndex],
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
