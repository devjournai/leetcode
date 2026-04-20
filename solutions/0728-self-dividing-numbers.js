/**
 * Self Dividing Numbers
 * Time Complexity: O((right - left + 1) * log10(right))
 * Space Complexity: O(right - left + 1)
 */
var selfDividingNumbers = function (left, right) {
  const selfDividingCollection = [];

  for (
    let currentNumberIterator = left;
    currentNumberIterator <= right;
    currentNumberIterator++
  ) {
    let isNumberSelfDividing = true;
    let tempNumberForDigits = currentNumberIterator;

    while (tempNumberForDigits > 0) {
      const currentDigitValue = tempNumberForDigits % 10;

      if (
        currentDigitValue === 0 ||
        currentNumberIterator % currentDigitValue !== 0
      ) {
        isNumberSelfDividing = false;
        break;
      }
      tempNumberForDigits = Math.floor(tempNumberForDigits / 10);
    }

    if (isNumberSelfDividing) {
      selfDividingCollection.push(currentNumberIterator);
    }
  }

  return selfDividingCollection;
};
