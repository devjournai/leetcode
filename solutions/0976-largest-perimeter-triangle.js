/**
 * Largest Perimeter Triangle
 * Intuition: After sorting descending, the first triple that satisfies triangle inequality (`medium + shortest > longest`) is the largest perimeter.
 * Approach: 1. Sort `inputArray` descending. 2. Slide windows of three. 3. Return their sum on the first valid triple. 4. Else 0.
 * Dry Run: inputArray = [2,1,2]. Sorted [2,2,1]. 2+1>2. Perimeter 5.
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
