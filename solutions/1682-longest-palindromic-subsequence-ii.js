/**
 * Longest Palindromic Subsequence II
 * Intuition: A good palindromic subsequence forbids two adjacent equal pairs of the same character (no "aaaa" as two 'a' pairs in a row). DP on a range plus the last paired character lets us add a new matching pair only when it differs from that last character.
 * Approach: 1. Allocate `memoizationData[lastChar][start][end]` (26 letters + a dummy last char). 2. `computeLPS(lastCharValue, startPointer, endPointer)`: empty range → 0. 3. If `s[start]===s[end]` and that letter ≠ `lastCharValue`, take 2 plus the inner range with the new last char; else skip start or end. 4. Return `computeLPS(26, 0, n-1)`.
 * Dry Run: s = "bbabab"
 * Pair outer 'b's then inner 'a's → "baab" length 4 (cannot add another adjacent 'b' pair of the same letter).
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
      inputStringLength
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
        endPointer - 1
      );
    } else {
      const resWhenSkippingStart = computeLPS(
        lastCharValue,
        startPointer + 1,
        endPointer
      );
      const resWhenSkippingEnd = computeLPS(
        lastCharValue,
        startPointer,
        endPointer - 1
      );
      maximumLengthFound = Math.max(resWhenSkippingStart, resWhenSkippingEnd);
    }

    return (memoizationData[lastCharValue][startPointer][endPointer] =
      maximumLengthFound);
  }
};
