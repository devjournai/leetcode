/**
 * Find Permutation
 * Intuition: Start from the identity 1..n+1. Each run of D’s means that slice should be decreasing, so reverse the corresponding segment of the identity (including the number after the run).
 * Approach: 1. Build `reconstructionResult = [1,2,…,s.length+1]`. 2. Scan s; on 'I' just advance. On 'D', extend `segmentEndScanner` through the consecutive D’s, then reverse indices `[segmentBeginIndex, segmentEndScanner]` in place, and jump the scan to the end of the run.
 * Dry Run: s = "I".
 *   - Array [1,2]. Only I → no reverse. Return [1,2].
 *   - s = "DI": start [1,2,3]. D at 0, run length 1, reverse indices 0..1 → [2,1,3]. Then I. Return [2,1,3].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findPermutation = function (s) {
  const permutationLength = s.length + 1;
  const reconstructionResult = new Array(permutationLength)
    .fill(0)
    .map((_element, indexPosition) => indexPosition + 1);

  let primaryLoopCounter = 0;
  while (primaryLoopCounter < s.length) {
    if (s[primaryLoopCounter] === "D") {
      const segmentBeginIndex = primaryLoopCounter;
      let segmentEndScanner = primaryLoopCounter;

      while (segmentEndScanner < s.length && s[segmentEndScanner] === "D") {
        segmentEndScanner++;
      }

      let reverseIteratorLeft = segmentBeginIndex;
      let reverseIteratorRight = segmentEndScanner;

      while (reverseIteratorLeft < reverseIteratorRight) {
        let temporarySwapValue = reconstructionResult[reverseIteratorLeft];
        reconstructionResult[reverseIteratorLeft] =
          reconstructionResult[reverseIteratorRight];
        reconstructionResult[reverseIteratorRight] = temporarySwapValue;
        reverseIteratorLeft++;
        reverseIteratorRight--;
      }

      primaryLoopCounter = segmentEndScanner;
    } else {
      primaryLoopCounter++;
    }
  }

  return reconstructionResult;
};
