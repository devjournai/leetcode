/**
 * Greatest Common Divisor Of Strings
 * Intuition: A common divisor string exists only if s+t equals t+s (they share a repeating block). The longest such block’s length is gcd of the two lengths.
 * Approach: 1. If s+t ≠ t+s, return "". 2. Euclidean gcd of the lengths. 3. Return s’s prefix of that length.
 * Dry Run: ABCABC and ABC. Concatenations match; gcd(6,3)=3 → ABC.
 * Time Complexity: O(length1 + length2)
 * Space Complexity: O(length1 + length2)
 */
var gcdOfStrings = function (firstString, secondString) {
  let combinedFirst = firstString + secondString;
  let combinedSecond = secondString + firstString;

  if (combinedFirst !== combinedSecond) {
    return "";
  }

  const findNumericGcd = (numberA, numberB) => {
    if (numberB === 0) {
      return numberA;
    }
    let remainderValue = numberA % numberB;
    return findNumericGcd(numberB, remainderValue);
  };

  let lengthOne = firstString.length;
  let lengthTwo = secondString.length;

  let gcdLength = findNumericGcd(lengthOne, lengthTwo);

  let finalResult = firstString.substring(0, gcdLength);
  return finalResult;
};
