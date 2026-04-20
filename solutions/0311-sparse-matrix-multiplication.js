/**
 * Sparse Matrix Multiplication
 * Time Complexity: O(M * K * N)
 * Space Complexity: O(M * N)
 */
var multiply = function (mat1, mat2) {
  const numMat1Rows = mat1.length;
  const numMat1Cols = mat1[0].length;
  const numMat2Cols = mat2[0].length;

  const productResult = new Array(numMat1Rows)
    .fill()
    .map(() => new Array(numMat2Cols).fill(0));

  const matrixAValuesPerColumn = new Array(numMat1Rows).fill().map(() => []);
  for (let currentMat1Row = 0; currentMat1Row < numMat1Rows; currentMat1Row++) {
    for (
      let currentMat1Col = 0;
      currentMat1Col < numMat1Cols;
      currentMat1Col++
    ) {
      if (mat1[currentMat1Row][currentMat1Col] !== 0) {
        matrixAValuesPerColumn[currentMat1Row].push({
          column: currentMat1Col,
          value: mat1[currentMat1Row][currentMat1Col],
        });
      }
    }
  }

  for (let finalRow = 0; finalRow < numMat1Rows; finalRow++) {
    for (const mat1Entry of matrixAValuesPerColumn[finalRow]) {
      const mat1ActualValue = mat1Entry.value;
      const mat1SharedColumn = mat1Entry.column;

      for (let finalColumn = 0; finalColumn < numMat2Cols; finalColumn++) {
        if (mat2[mat1SharedColumn][finalColumn] !== 0) {
          productResult[finalRow][finalColumn] +=
            mat1ActualValue * mat2[mat1SharedColumn][finalColumn];
        }
      }
    }
  }

  return productResult;
};
