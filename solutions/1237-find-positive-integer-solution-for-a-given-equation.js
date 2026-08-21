/**
 * Find Positive Integer Solution For A Given Equation
 * Intuition: f is strictly increasing in both arguments, so as x grows the matching y can only stay or decrease — a two-pointer scan.
 * Approach: 1. y starts at 1000. 2. For x=1..1000 decrease y while f(x,y)>z. 3. If f(x,y)==z record [x,y].
 * Dry Run: f(x,y)=x+y, z=5. Pairs (1,4),(2,3),(3,2),(4,1).
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
