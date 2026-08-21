/**
 * Multiply Strings
 * Intuition: Multiply as on paper: each pair of digits contributes to a fixed pair of slots in a length-(L1+L2) array (ones place and carry). Leading zeros are stripped at the end.
 * Approach: 1. Allocate a zero-filled array of size L1+L2. 2. From the last digit of each string, multiply digits i and j into position i+j+1, add any existing value, write remainder, and add carry into i+j. 3. Join digits and strip leading zeros (keep a single 0).
 * Dry Run: num1 = "123", num2 = "45".
 *   - 3*5=15 → ones slot 5, carry 1 into the next slot; continue for 2*5, 1*5, then all of *4.
 *   - Array becomes the digits of 5535. Join and return "5535".
 * Time Complexity: O(L1 * L2)
 * Space Complexity: O(L1 + L2)
 */
var multiply = function (num1, num2) {
  const firstNumberLength = num1.length;
  const secondNumberLength = num2.length;
  const productArray = new Array(firstNumberLength + secondNumberLength).fill(
    0
  );

  for (
    let outerLoopCounter = firstNumberLength - 1;
    outerLoopCounter >= 0;
    outerLoopCounter--
  ) {
    for (
      let innerLoopCounter = secondNumberLength - 1;
      innerLoopCounter >= 0;
      innerLoopCounter--
    ) {
      const digitA = parseInt(num1[outerLoopCounter]);
      const digitB = parseInt(num2[innerLoopCounter]);

      const currentDigitPosition = outerLoopCounter + innerLoopCounter + 1;
      const carryPosition = outerLoopCounter + innerLoopCounter;

      const calculationSum =
        digitA * digitB + productArray[currentDigitPosition];

      const carryToNextLevel = Math.floor(calculationSum / 10);
      const remainderDigit = calculationSum % 10;

      productArray[carryPosition] += carryToNextLevel;
      productArray[currentDigitPosition] = remainderDigit;
    }
  }

  const rawResultString = productArray.join("");
  const trimmedResult = rawResultString.replace(/^0+(?!$)/, "");

  return trimmedResult;
};
