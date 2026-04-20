/**
 * Find The Minimum Number Of Fibonacci Numbers Whose Sum Is K
 * Time Complexity: O(log k)
 * Space Complexity: O(log k)
 */
var findMinFibonacciNumbers = function (k) {
  const fibonacciSequence = [1, 1];
  let firstTerm = 1;
  let secondTerm = 1;

  while (secondTerm <= k) {
    let nextTerm = firstTerm + secondTerm;
    fibonacciSequence.push(nextTerm);
    firstTerm = secondTerm;
    secondTerm = nextTerm;
  }

  let minimumFibsCount = 0;
  let currentRemainder = k;
  let fibIndex = fibonacciSequence.length - 1;

  while (currentRemainder > 0 && fibIndex >= 0) {
    if (fibonacciSequence[fibIndex] <= currentRemainder) {
      currentRemainder -= fibonacciSequence[fibIndex];
      minimumFibsCount++;
    }
    fibIndex--;
  }

  return minimumFibsCount;
};
