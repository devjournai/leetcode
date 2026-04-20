/**
 * Digit Count In Range
 * Time Complexity: O(log(high))
 * Space Complexity: O(log(high))
 */
var digitsCount = function (d, low, high) {
  function quantifyDigitOccurrences(upperLimit) {
    if (upperLimit < 0) {
      return 0;
    }

    const currentNumberString = upperLimit.toString();
    const currentNumberLength = currentNumberString.length;
    let totalCountOfDigit = 0;

    for (
      let digitPosition = 0;
      digitPosition < currentNumberLength;
      digitPosition++
    ) {
      const leftPartStr = currentNumberString.substring(0, digitPosition);
      const leftPartNumeric = leftPartStr === "" ? 0 : parseInt(leftPartStr);

      const centralChar = currentNumberString[digitPosition];
      const centralDigitNumeric = parseInt(centralChar);

      const rightPartStr = currentNumberString.substring(digitPosition + 1);
      const rightPartNumeric = rightPartStr === "" ? 0 : parseInt(rightPartStr);

      const lengthOfRightPart = currentNumberLength - 1 - digitPosition;
      const baseTenPower = Math.pow(10, lengthOfRightPart);

      if (d === 0) {
        if (digitPosition === 0) {
          continue;
        }

        const contributionFromPrefixes = (leftPartNumeric - 1) * baseTenPower;

        if (centralDigitNumeric > d) {
          totalCountOfDigit += contributionFromPrefixes + baseTenPower;
        } else if (centralDigitNumeric === d) {
          totalCountOfDigit += contributionFromPrefixes + rightPartNumeric + 1;
        } else {
          totalCountOfDigit += contributionFromPrefixes + baseTenPower;
        }
      } else {
        const contributionFromEarlierBlocks = leftPartNumeric * baseTenPower;

        if (centralDigitNumeric > d) {
          totalCountOfDigit += contributionFromEarlierBlocks + baseTenPower;
        } else if (centralDigitNumeric === d) {
          totalCountOfDigit +=
            contributionFromEarlierBlocks + rightPartNumeric + 1;
        } else {
          totalCountOfDigit += contributionFromEarlierBlocks;
        }
      }
    }
    return totalCountOfDigit;
  }

  return quantifyDigitOccurrences(high) - quantifyDigitOccurrences(low - 1);
};
