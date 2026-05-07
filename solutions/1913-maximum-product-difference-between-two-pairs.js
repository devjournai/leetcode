/**
 * Maximum Product Difference Between Two Pairs
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxProductDifference = function (inputNumbers) {
  let largestValOne = -Infinity;
  let largestValTwo = -Infinity;
  let smallestValOne = Infinity;
  let smallestValTwo = Infinity;

  for (const currentNumber of inputNumbers) {
    if (currentNumber > largestValOne) {
      largestValTwo = largestValOne;
      largestValOne = currentNumber;
    } else if (currentNumber > largestValTwo) {
      largestValTwo = currentNumber;
    }

    if (currentNumber < smallestValOne) {
      smallestValTwo = smallestValOne;
      smallestValOne = currentNumber;
    } else if (currentNumber < smallestValTwo) {
      smallestValTwo = currentNumber;
    }
  }

  return largestValOne * largestValTwo - smallestValOne * smallestValTwo;
};
