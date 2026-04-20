/**
 * Restore The Array
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
