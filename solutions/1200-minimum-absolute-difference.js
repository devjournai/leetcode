/**
 * Minimum Absolute Difference
 * Intuition: After sorting, the global minimum difference must occur between adjacent values; collect every adjacent pair that matches that min.
 * Approach: 1. Sort a copy. 2. Scan adjacent diffs for the minimum. 3. Scan again and push pairs whose diff equals that minimum.
 * Dry Run: arr = [4,2,1,3] → sorted [1,2,3,4], min diff 1, pairs [1,2],[2,3],[3,4].
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
