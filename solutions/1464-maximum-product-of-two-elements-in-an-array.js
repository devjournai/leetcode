/**
 * Maximum Product Of Two Elements In An Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxProduct = function (inputNumberCollection) {
  let largestNumber = 0;
  let secondLargestNumber = 0;

  let currentIteration = 0;
  const totalElements = inputNumberCollection.length;

  for (
    currentIteration = 0;
    currentIteration < totalElements;
    currentIteration++
  ) {
    const currentNumericalValue = inputNumberCollection[currentIteration];

    if (currentNumericalValue > largestNumber) {
      secondLargestNumber = largestNumber;
      largestNumber = currentNumericalValue;
    } else if (currentNumericalValue > secondLargestNumber) {
      secondLargestNumber = currentNumericalValue;
    }
  }

  const adjustedLargest = largestNumber - 1;
  const adjustedSecondLargest = secondLargestNumber - 1;
  const calculatedProduct = adjustedLargest * adjustedSecondLargest;

  return calculatedProduct;
};
