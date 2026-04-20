/**
 * Flip Columns For Maximum Number Of Equal Rows
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var maxEqualRowsAfterFlips = function (matrix) {
  const patternFrequencies = new Map();
  const totalRows = matrix.length;
  const totalColumns = matrix[0].length;

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    let constructedPattern = "";
    let invertedPattern = "";
    for (let colIndex = 0; colIndex < totalColumns; colIndex++) {
      constructedPattern += matrix[rowIndex][colIndex];
      invertedPattern += 1 - matrix[rowIndex][colIndex];
    }
    patternFrequencies.set(
      constructedPattern,
      (patternFrequencies.get(constructedPattern) || 0) + 1,
    );
    patternFrequencies.set(
      invertedPattern,
      (patternFrequencies.get(invertedPattern) || 0) + 1,
    );
  }

  let maximumRows = 0;
  for (const currentCount of patternFrequencies.values()) {
    maximumRows = Math.max(maximumRows, currentCount);
  }

  return maximumRows;
};
