/**
 * Find Positive Integer Solution For A Given Equation
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findSolution = function (customfunction, z) {
  const resultCombinations = [];
  let currentYLimit = 1000;

  for (
    let currentXCoordinate = 1;
    currentXCoordinate <= 1000;
    currentXCoordinate++
  ) {
    while (
      currentYLimit >= 1 &&
      customfunction.f(currentXCoordinate, currentYLimit) > z
    ) {
      currentYLimit--;
    }

    if (
      currentYLimit >= 1 &&
      customfunction.f(currentXCoordinate, currentYLimit) === z
    ) {
      resultCombinations.push([currentXCoordinate, currentYLimit]);
    }
  }

  return resultCombinations;
};
