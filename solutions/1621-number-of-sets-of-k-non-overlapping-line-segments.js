/**
 * Number Of Sets Of K Non Overlapping Line Segments
 * Time Complexity: O( (N_max)^2 )
 * Space Complexity: O( (N_max)^2 )
 */
var numberOfSets = function (n, k) {
  const moduloValue = 1e9 + 7;
  const maxPossibleDimension = 2 * n + 1;

  const combinationsMatrix = Array.from({ length: maxPossibleDimension }, () =>
    Array(maxPossibleDimension).fill(0),
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
