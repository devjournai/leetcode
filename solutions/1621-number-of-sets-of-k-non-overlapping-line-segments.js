/**
 * Number Of Sets Of K Non Overlapping Line Segments
 * Intuition: Placing k non-overlapping segments on n labeled points is combinatorially C(n+k-1, 2k). Precompute Pascal's triangle modulo 1e9+7 and read that entry.
 * Approach: 1. Build combinationsMatrix up to 2n via C(r,c)=C(r-1,c-1)+C(r-1,c). 2. Return C(n+k-1, 2k) mod 1e9+7.
 * Dry Run: n=4, k=2 → C(5,4)=5.
 * Time Complexity: O( (N_max)^2 )
 * Space Complexity: O( (N_max)^2 )
 */
var numberOfSets = function (n, k) {
  const moduloValue = 1e9 + 7;
  const maxPossibleDimension = 2 * n + 1;

  const combinationsMatrix = Array.from({ length: maxPossibleDimension }, () =>
    Array(maxPossibleDimension).fill(0)
  );

  for (let currentRow = 0; currentRow < maxPossibleDimension; currentRow++) {
    combinationsMatrix[currentRow][0] = 1;
    for (let currentColumn = 1; currentColumn <= currentRow; currentColumn++) {
      combinationsMatrix[currentRow][currentColumn] =
        (combinationsMatrix[currentRow - 1][currentColumn - 1] +
          combinationsMatrix[currentRow - 1][currentColumn]) %
        moduloValue;
    }
  }

  const combinationNValue = n + k - 1;
  const combinationKValue = 2 * k;

  return combinationsMatrix[combinationNValue][combinationKValue];
};
