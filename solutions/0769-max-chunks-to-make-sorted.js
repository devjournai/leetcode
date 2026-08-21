/**
 * Max Chunks To Make Sorted
 * Intuition: `arr` is a permutation of `0..n-1`. A chunk ending at i is valid iff the max value seen so far equals i (all of 0..i are inside that prefix).
 * Approach: 1. Scan `currentPosition` from 0, updating `maximumSeen`. 2. Whenever `maximumSeen === currentPosition`, increment `totalChunks`. 3. Return `totalChunks`.
 * Dry Run: arr = [1,0,2,3,4].
 *   - i=0 max=1; i=1 max=1 === 1 → chunk. i=2 max=2 → chunk. i=3 max=3 → chunk. i=4 max=4 → chunk. Return 4.
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
