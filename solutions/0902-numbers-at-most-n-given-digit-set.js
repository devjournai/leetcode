/**
 * Numbers At Most N Given Digit Set
 * Time Complexity: O(L * D)
 * Space Complexity: O(L)
 */
var atMostNGivenDigitSet = function (digits, n) {
  const limitString = n.toString();
  const stringLength = limitString.length;
  const digitSetSize = digits.length;
  let finalAnswer = 0;

  for (let currentLength = 1; currentLength < stringLength; currentLength++) {
    finalAnswer += Math.pow(digitSetSize, currentLength);
  }

  function calculateExactLengthNumbers(positionIndex) {
    if (positionIndex === stringLength) {
      return 1;
    }

    const digitAtNPosition = limitString[positionIndex];
    let segmentSum = 0;

    for (const singleAvailableDigit of digits) {
      if (singleAvailableDigit < digitAtNPosition) {
        const remainingPlaces = stringLength - 1 - positionIndex;
        segmentSum += Math.pow(digitSetSize, remainingPlaces);
      } else if (singleAvailableDigit === digitAtNPosition) {
        segmentSum += calculateExactLengthNumbers(positionIndex + 1);
      } else {
        break;
      }
    }
    return segmentSum;
  }

  finalAnswer += calculateExactLengthNumbers(0);
  return finalAnswer;
};
