/**
 * Non Negative Integers Without Consecutive Ones
 * Intuition: Count binary strings without adjacent 1s that are ≤ n. Fibonacci `fibonacciSequence[len]` counts valid strings of that length. Digit-DP style: for each 1-bit, add all valid suffixes of the remaining width; consecutive 1s in n cut off larger numbers; finally include n itself if valid.
 * Approach: 1. `binaryString = n.toString(2)`, `stringLength` its length. 2. `fibonacciSequence[0]=1`, `[1]=2`, then F[i]=F[i-1]+F[i-2]. 3. Scan bits MSB-first: on 1, add `fibonacciSequence[stringLength-1-currentBitIndex]`; if `previousBitWasOne` already 1, return `totalCount`. 4. Else if we finish the bits, return `totalCount + 1`.
 * Dry Run: n=5 → "101".
 *   - F: [1,2,3]. Bit 1: add F[2]=3, prev=1. Bit 0: prev=0. Bit 1: add F[0]=1, prev=1. End +1 → 5. (0,1,2,4,5).
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */
var findIntegers = function (n) {
  const binaryString = n.toString(2);
  const stringLength = binaryString.length;

  const fibonacciSequence = new Array(stringLength + 1).fill(0);
  fibonacciSequence[0] = 1;
  fibonacciSequence[1] = 2;

  for (let currentLength = 2; currentLength <= stringLength; currentLength++) {
    fibonacciSequence[currentLength] =
      fibonacciSequence[currentLength - 1] +
      fibonacciSequence[currentLength - 2];
  }

  let totalCount = 0;
  let previousBitWasOne = 0;

  for (
    let currentBitIndex = 0;
    currentBitIndex < stringLength;
    currentBitIndex++
  ) {
    const bitValue = parseInt(binaryString[currentBitIndex], 10);

    if (bitValue === 1) {
      totalCount += fibonacciSequence[stringLength - 1 - currentBitIndex];
      if (previousBitWasOne === 1) {
        return totalCount;
      }
      previousBitWasOne = 1;
    } else {
      previousBitWasOne = 0;
    }
  }

  return totalCount + 1;
};
