/**
 * Longest Palindromic Subsequence II
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var longestPalindromeSubseq = function (s) {
  const inputStringLength = s.length;
  const charSetSize = 26;
  const asciiOffset = 97;

  const memoizationData = new Array(charSetSize + 1);
  for (
    let loopCounterOne = 0;
    loopCounterOne <= charSetSize;
    loopCounterOne++
  ) {
    const currentMatrixRow = (memoizationData[loopCounterOne] = new Array(
      inputStringLength,
    ));
    for (
      let loopCounterTwo = 0;
      loopCounterTwo < inputStringLength;
      loopCounterTwo++
    ) {
      currentMatrixRow[loopCounterTwo] = new Array(inputStringLength);
    }
  }

  return computeLPS(charSetSize, 0, inputStringLength - 1);

  function computeLPS(lastCharValue, startPointer, endPointer) {
    if (startPointer >= endPointer) {
      return 0;
    }

    const storedResult =
      memoizationData[lastCharValue][startPointer][endPointer];
    if (storedResult !== undefined) {
      return storedResult;
    }

    let maximumLengthFound = 0;
    const charValueAtStart = s.charCodeAt(startPointer) - asciiOffset;
    const charValueAtEnd = s.charCodeAt(endPointer) - asciiOffset;

    if (charValueAtStart === charValueAtEnd) {
      if (charValueAtStart !== lastCharValue) {
        maximumLengthFound = 2;
      }
      maximumLengthFound += computeLPS(
        charValueAtStart,
        startPointer + 1,
        endPointer - 1,
      );
    } else {
      const resWhenSkippingStart = computeLPS(
        lastCharValue,
        startPointer + 1,
        endPointer,
      );
      const resWhenSkippingEnd = computeLPS(
        lastCharValue,
        startPointer,
        endPointer - 1,
      );
      maximumLengthFound = Math.max(resWhenSkippingStart, resWhenSkippingEnd);
    }

    return (memoizationData[lastCharValue][startPointer][endPointer] =
      maximumLengthFound);
  }
};
