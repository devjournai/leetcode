/**
 * Lucky Numbers In A Matrix
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
    -Infinity,
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
