/**
 * Count Nice Pairs In An Array
 * Time Complexity: O(n * log(maxNum))
 * Space Complexity: O(n)
 */
var countNicePairs = function (inputNumbers) {
  const moduloConstant = 1e9 + 7;
  let totalNicePairs = 0;
  const differenceFrequencies = new Map();

  const obtainReversedValue = (numericInput) => {
    const stringRepresentation = String(numericInput);
    const reversedString = stringRepresentation.split("").reverse().join("");
    const parsedReversed = Number(reversedString);
    return parsedReversed;
  };

  for (let indexValue = 0; indexValue < inputNumbers.length; indexValue++) {
    const currentElement = inputNumbers[indexValue];
    const valueReversed = obtainReversedValue(currentElement);
    const calculatedDifference = currentElement - valueReversed;

    const existingCount = differenceFrequencies.get(calculatedDifference) || 0;
    totalNicePairs = (totalNicePairs + existingCount) % moduloConstant;

    differenceFrequencies.set(calculatedDifference, existingCount + 1);
  }

  return totalNicePairs;
};
