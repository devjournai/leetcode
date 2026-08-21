/**
 * Self Dividing Numbers
 * Intuition: A number is self-dividing if it has no 0 digit and is divisible by every digit. Check every integer in `[left, right]` by peeling digits with `% 10`.
 * Approach: 1. For each `currentNumberIterator`, copy into `tempNumberForDigits`. 2. While > 0, reject if the digit is 0 or the number is not divisible by it. 3. Push survivors into `selfDividingCollection`.
 * Dry Run: left=1, right=22. 22 has digits 2,2 and 22%2=0 so it is included; 13 is not (13%3≠0).
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
