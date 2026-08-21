/**
 * Maximum Product Difference Between Two Pairs
 * Intuition: Max product difference is (two largest) − (two smallest) after one linear scan.
 * Approach: 1. Track `largestValOne/Two` and `smallestValOne/Two`. 2. Update on each `currentNumber`. 3. Return large1*large2 − small1*small2.
 * Dry Run: nums=[5,6,2,7,4]. Largest 7,6 smallest 2,4 → 42−8=34.
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
