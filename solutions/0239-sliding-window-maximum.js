/**
 * Sliding Window Maximum
 * Time Complexity: O(n)
 * Space Complexity: O(k)
*/
var maxSlidingWindow = function (inputNumbers, windowSize) {
  const outputResults = [];
  const maxIndexDeque = [];

  let currentIterator = 0;
  const totalElements = inputNumbers.length;

  while (currentIterator < totalElements) {
    while (maxIndexDeque.length > 0 && maxIndexDeque[0] <= currentIterator - windowSize) {
      maxIndexDeque.shift();
    }

    while (maxIndexDeque.length > 0 && inputNumbers[maxIndexDeque[maxIndexDeque.length - 1]] < inputNumbers[currentIterator]) {
      maxIndexDeque.pop();
    }

    maxIndexDeque.push(currentIterator);

    if (currentIterator >= windowSize - 1) {
      outputResults.push(inputNumbers[maxIndexDeque[0]]);
    }

    currentIterator++;
  }

  return outputResults;
};