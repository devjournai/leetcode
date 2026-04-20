/**
 * Minimum Absolute Difference
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minimumAbsDifference = function (arr) {
  const sortedValues = arr
    .slice()
    .sort((valueOne, valueTwo) => valueOne - valueTwo);

  let smallestDifference = Infinity;

  for (
    let indexPosition = 1;
    indexPosition < sortedValues.length;
    indexPosition++
  ) {
    let currentNumber = sortedValues[indexPosition];
    let previousNumber = sortedValues[indexPosition - 1];
    let diffValue = currentNumber - previousNumber;
    smallestDifference = Math.min(smallestDifference, diffValue);
  }

  const resultCollection = [];

  for (
    let currentIterator = 1;
    currentIterator < sortedValues.length;
    currentIterator++
  ) {
    let rightValue = sortedValues[currentIterator];
    let leftValue = sortedValues[currentIterator - 1];
    let computedDifference = rightValue - leftValue;

    if (computedDifference === smallestDifference) {
      resultCollection.push([leftValue, rightValue]);
    }
  }

  return resultCollection;
};
