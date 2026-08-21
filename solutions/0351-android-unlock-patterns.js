/**
 * Android Unlock Patterns
 * Intuition: A valid pattern is a path on the 1–9 keypad that never reuses a digit; a knight-style jump over an unvisited middle key is illegal, so we only allow a jump if that middle key is already used.
 * Approach: 1. Fill `skipMatrix` so knight-line pairs (1-3, 1-7, 1-9, 2-8, 4-6, …) record their middle digit. 2. DFS from the current digit: count the path if length is in [m, n], stop at length n, otherwise try unused next digits whose skip cell is 0 or already visited. 3. Exploit 4-fold symmetry by starting only at 1, 2, and 5 and multiplying those counts by 4, 4, and 1.
 * Dry Run: m = n = 1. Starts 1, 2, 5 each produce one length-1 pattern; 4*1 + 4*1 + 1*1 = 9.
 * Time Complexity: O(N_dots * P(N_dots, n))
 * Space Complexity: O(n)
 */
var numberOfPatterns = function (m, n) {
  const skipMatrix = new Array(10).fill(null).map(() => new Array(10).fill(0));

  skipMatrix[1][3] = skipMatrix[3][1] = 2;
  skipMatrix[1][7] = skipMatrix[7][1] = 4;
  skipMatrix[3][9] = skipMatrix[9][3] = 6;
  skipMatrix[7][9] = skipMatrix[9][7] = 8;
  skipMatrix[1][9] =
    skipMatrix[9][1] =
    skipMatrix[2][8] =
    skipMatrix[8][2] =
    skipMatrix[3][7] =
    skipMatrix[7][3] =
    skipMatrix[4][6] =
    skipMatrix[6][4] =
      5;

  const recursiveSolver = (currentPosition, patternVisited, patternLength) => {
    if (patternLength > n) {
      return 0;
    }

    let currentPatternCount = 0;
    if (patternLength >= m) {
      currentPatternCount = 1;
    }

    if (patternLength === n) {
      return currentPatternCount;
    }

    for (let potentialNext = 1; potentialNext <= 9; potentialNext++) {
      if (patternVisited.has(potentialNext) === false) {
        const passedThroughKey = skipMatrix[currentPosition][potentialNext];

        if (passedThroughKey === 0 || patternVisited.has(passedThroughKey)) {
          patternVisited.add(potentialNext);
          currentPatternCount += recursiveSolver(
            potentialNext,
            patternVisited,
            patternLength + 1
          );
          patternVisited.delete(potentialNext);
        }
      }
    }
    return currentPatternCount;
  };

  let totalValidPatterns = 0;
  const initialVisitedSet = new Set();

  const startPoints = [1, 2, 5];
  const symmetryMultipliers = [4, 4, 1];

  for (let indexValue = 0; indexValue < startPoints.length; indexValue++) {
    const starterDot = startPoints[indexValue];
    const multiplierFactor = symmetryMultipliers[indexValue];

    initialVisitedSet.add(starterDot);
    totalValidPatterns +=
      recursiveSolver(starterDot, initialVisitedSet, 1) * multiplierFactor;
    initialVisitedSet.delete(starterDot);
  }

  return totalValidPatterns;
};
