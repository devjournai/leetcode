/**
 * Max Chunks To Make Sorted
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxChunksToSorted = function (arr) {
  let totalChunks = 0;
  let maximumSeen = 0;
  let currentPosition = 0;
  const inputPermutation = arr;
  const permutationLength = inputPermutation.length;

  while (currentPosition < permutationLength) {
    maximumSeen = Math.max(maximumSeen, inputPermutation[currentPosition]);

    if (maximumSeen === currentPosition) {
      totalChunks++;
    }
    currentPosition++;
  }

  return totalChunks;
};
