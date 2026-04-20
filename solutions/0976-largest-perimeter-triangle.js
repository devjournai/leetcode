/**
 * Largest Perimeter Triangle
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var largestPerimeter = function (inputArray) {
  inputArray.sort((sideA, sideB) => sideB - sideA);

  for (
    let currentIterator = 0;
    currentIterator < inputArray.length - 2;
    ++currentIterator
  ) {
    let longestEdge = inputArray[currentIterator];
    let mediumEdge = inputArray[currentIterator + 1];
    let shortestEdge = inputArray[currentIterator + 2];

    if (mediumEdge + shortestEdge > longestEdge) {
      return longestEdge + mediumEdge + shortestEdge;
    }
  }

  return 0;
};
