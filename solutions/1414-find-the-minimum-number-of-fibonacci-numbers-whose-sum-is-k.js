/**
 * Find The Minimum Number Of Fibonacci Numbers Whose Sum Is K
 * Intuition: Zeckendorf's theorem: the greedy largest-Fibonacci-not-exceeding-remainder uses the fewest terms.
 * Approach: 1. Generate Fibonacci numbers until they exceed k. 2. Walk from largest to smallest, subtracting whenever fib[i] <= remainder and counting each subtraction.
 * Dry Run: k = 7.
 *   - Fibs include 1,1,2,3,5,8. 8>7 skip; 5<=7 → rem 2; 3 skip; 2<=2 → rem 0. Count 2 (5+2).
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
