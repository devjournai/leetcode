/**
 * Digit Count In Range
 * Intuition: Count of digit d in [low, high] is count(≤high) minus count(≤low-1). Digit DP by place uses the left prefix, current digit, and right suffix to add how often d appears in that position.
 * Approach: 1. For each place, split the number into left, digit, right. 2. Add left×10^rightLen (or left-1 when d=0 and not the leading place). 3. If the place digit equals d, add right+1; if greater, add a full block. 4. Subtract the two bounds.
 * Dry Run: d=1, low=1, high=13. Count ≤13 of digit 1 is 6 (1,10,11,12,13); ≤0 is 0 → 6.
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
