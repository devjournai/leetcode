/**
 * Perfect Squares
 * Intuition: The fewest squares summing to n is the shortest path that repeatedly subtracts a perfect square. BFS from n reaches 0 at that length.
 * Approach: 1. Queue n; mark visited. 2. Each level, dequeue remainders and subtract 1^2, 2^2, ... while square <= remainder. 3. Remainder 0 → return the level. 4. Enqueue unseen remainders.
 * Dry Run: n = 12.
 *   - Level 1 from 12: 11, 8, 3. Level 2 from 8 includes 4. Level 3 from 4: 4-4=0.
 *   - Return 3 (12 = 4+4+4).
 * Time Complexity: O(N * sqrt(N))
 * Space Complexity: O(N)
 */
var numSquares = function (n) {
  const numbersToExplore = [n];
  const exploredNumbersSet = new Set();
  exploredNumbersSet.add(n);
  let currentPathLength = 0;

  while (numbersToExplore.length > 0) {
    currentPathLength++;
    let currentLevelSize = numbersToExplore.length;

    for (
      let currentLevelIndex = 0;
      currentLevelIndex < currentLevelSize;
      currentLevelIndex++
    ) {
      let currentNumber = numbersToExplore.shift();

      for (let perfectSquareRoot = 1; ; perfectSquareRoot++) {
        let squareValue = perfectSquareRoot * perfectSquareRoot;
        if (squareValue > currentNumber) {
          break;
        }

        let nextValueToReach = currentNumber - squareValue;

        if (nextValueToReach === 0) {
          return currentPathLength;
        }

        if (!exploredNumbersSet.has(nextValueToReach)) {
          exploredNumbersSet.add(nextValueToReach);
          numbersToExplore.push(nextValueToReach);
        }
      }
    }
  }

  return -1;
};
