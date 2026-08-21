/**
 * Flip Columns For Maximum Number Of Equal Rows
 * Intuition: Column flips make a row equal to any other row that is identical or bitwise complementary. Counting each row’s pattern and its inverse therefore groups rows that can become the same.
 * Approach: 1. For each row, build the bit-string and its 0/1 inverse. 2. Increment frequencies of both. 3. Return the maximum frequency (rows that share a pattern or its complement).
 * Dry Run: [[0,1],[1,0]]. Row0 contributes "01" and "10"; row1 contributes "10" and "01". Max count 2.
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
      (patternFrequencies.get(constructedPattern) || 0) + 1
    );
    patternFrequencies.set(
      invertedPattern,
      (patternFrequencies.get(invertedPattern) || 0) + 1
    );
  }

  let maximumRows = 0;
  for (const currentCount of patternFrequencies.values()) {
    maximumRows = Math.max(maximumRows, currentCount);
  }

  return maximumRows;
};
