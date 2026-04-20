/**
 * Greatest Common Divisor Of Strings
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
