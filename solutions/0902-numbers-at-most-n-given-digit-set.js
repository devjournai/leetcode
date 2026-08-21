/**
 * Numbers At Most N Given Digit Set
 * Intuition: Count numbers with fewer digits than n as `D^len`. For the same length, digit DP: at each position place a strictly smaller allowed digit and fill the rest freely, or match n's digit and recurse.
 * Approach: 1. Add `digitSetSize^len` for len 1..L-1. 2. `calculateExactLengthNumbers(i)`: if i === L return 1 (matched n). 3. For each allowed digit < n[i], add D^(L-1-i); if equal, recurse i+1; if larger, break (digits are sorted). 4. Add that to `finalAnswer`.
 * Dry Run: digits = ["1","3","5","7"], n = 100.
 *   - 1-digit: 4, 2-digit: 16. Same length 3: first digit cannot be 1,3,5,7 vs '1' — only 1 matches then remaining fail. Total 20.
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
