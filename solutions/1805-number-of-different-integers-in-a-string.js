/**
 * Number Of Different Integers In A String
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var numDifferentIntegers = function (word) {
  const uniqueNumbersSet = new Set();
  let buildingNumber = "";
  const processedInput = word + "a";

  for (let charIndex = 0; charIndex < processedInput.length; ++charIndex) {
    const currentChar = processedInput[charIndex];

    if (/\d/.test(currentChar)) {
      buildingNumber += currentChar;
    } else {
      if (buildingNumber.length > 0) {
        const bigIntValue = BigInt(buildingNumber);
        const stringifiedNumber = String(bigIntValue);
        uniqueNumbersSet.add(stringifiedNumber);
        buildingNumber = "";
      }
    }
  }

  return uniqueNumbersSet.size;
};
