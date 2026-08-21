/**
 * Lucky Numbers In A Matrix
 * Intuition: A lucky number is a row minimum that is also a column maximum. Collect all row mins and all column maxes, then keep values that appear in both lists.
 * Approach: 1. For each row, take Math.min. 2. For each column, take the max. 3. Filter row mins that appear among column maxes.
 * Dry Run: matrix = [[3,7,8],[9,11,13],[15,16,17]].
 *   - Row mins: 3, 9, 15. Col maxes: 15, 16, 17. Intersection: [15].
 * Time Complexity: O(m * n)
 * Space Complexity: O(m + n)
 */
var luckyNumbers = function (matrix) {
  const numberOfRowsInMatrix = matrix.length;
  const numberOfColumnsInMatrix = matrix[0].length;

  const rowMinimumsCollection = [];
  matrix.forEach((currentMatrixRow) => {
    const minimumInRow = Math.min(...currentMatrixRow);
    rowMinimumsCollection.push(minimumInRow);
  });

  const columnMaximumsCollection = new Array(numberOfColumnsInMatrix).fill(
    -Infinity
  );
  for (
    let columnTraversalIndex = 0;
    columnTraversalIndex < numberOfColumnsInMatrix;
    columnTraversalIndex++
  ) {
    for (
      let rowTraversalIndex = 0;
      rowTraversalIndex < numberOfRowsInMatrix;
      rowTraversalIndex++
    ) {
      const currentMatrixElement =
        matrix[rowTraversalIndex][columnTraversalIndex];
      if (
        currentMatrixElement > columnMaximumsCollection[columnTraversalIndex]
      ) {
        columnMaximumsCollection[columnTraversalIndex] = currentMatrixElement;
      }
    }
  }

  const finalLuckyElements = rowMinimumsCollection.filter((singleRowMin) => {
    return columnMaximumsCollection.includes(singleRowMin);
  });

  return finalLuckyElements;
};
