/**
 * Non Negative Integers Without Consecutive Ones
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
