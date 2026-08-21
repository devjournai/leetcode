/**
 * Restore The Array
 * Intuition: ways[i] is the number of ways to decode the prefix of length i into numbers in [1, k]. A last number is a non-leading-zero substring whose integer value is <= k.
 * Approach: 1. ways[0] = 1. 2. For each end i, walk start backward, skip leading zeros of the last number, stop if the digit count exceeds digits(k) or the value > k. 3. Add ways[start] into ways[i] mod 1e9+7. 4. Return ways[n].
 * Dry Run: s = "1317", k = 2000.
 *   - Every split of 1317 is valid (all parts <= 2000). ways[4] counts all partitions, matching the sample 8.
 * Time Complexity: O(N * log10(K))
 * Space Complexity: O(N)
 */
var numberOfArrays = function (inputString, maxNumber) {
  const modulusValue = 1e9 + 7;
  const stringLength = inputString.length;
  const maxDigitsK = String(maxNumber).length;

  const waysCount = new Array(stringLength + 1).fill(0);
  waysCount[0] = 1;

  for (
    let currentEndIndex = 1;
    currentEndIndex <= stringLength;
    currentEndIndex++
  ) {
    let currentSegmentValue = 0;
    let currentPowerOfTen = 1;

    for (
      let currentStartIndex = currentEndIndex - 1;
      currentStartIndex >= 0;
      currentStartIndex--
    ) {
      const digitChar = inputString[currentStartIndex];

      if (digitChar === "0") {
        currentPowerOfTen = 1;
        currentSegmentValue = 0;
        continue;
      }

      const digitValue = Number(digitChar);

      if (currentEndIndex - currentStartIndex > maxDigitsK) {
        break;
      }

      if (currentStartIndex === currentEndIndex - 1) {
        currentSegmentValue = digitValue;
      } else {
        currentPowerOfTen *= 10;
        currentSegmentValue =
          digitValue * currentPowerOfTen + currentSegmentValue;
      }

      if (currentSegmentValue > maxNumber) {
        break;
      }

      waysCount[currentEndIndex] =
        (waysCount[currentEndIndex] + waysCount[currentStartIndex]) %
        modulusValue;
    }
  }

  return waysCount[stringLength];
};
