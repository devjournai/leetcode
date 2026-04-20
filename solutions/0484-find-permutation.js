/**
 * Find Permutation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findPermutation = function (s) {
  const permutationLength = s.length + 1;
  const reconstructionResult = new Array(permutationLength).fill(0).map((_element, indexPosition) => indexPosition + 1);

  let primaryLoopCounter = 0;
  while (primaryLoopCounter < s.length) {
    if (s[primaryLoopCounter] === 'D') {
      const segmentBeginIndex = primaryLoopCounter;
      let segmentEndScanner = primaryLoopCounter;

      while (segmentEndScanner < s.length && s[segmentEndScanner] === 'D') {
        segmentEndScanner++;
      }

      let reverseIteratorLeft = segmentBeginIndex;
      let reverseIteratorRight = segmentEndScanner;

      while (reverseIteratorLeft < reverseIteratorRight) {
        let temporarySwapValue = reconstructionResult[reverseIteratorLeft];
        reconstructionResult[reverseIteratorLeft] = reconstructionResult[reverseIteratorRight];
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