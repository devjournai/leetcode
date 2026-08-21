/**
 * Maximum Side Length of a Square with Sum Less than or Equal to Threshold
 * Intuition: 2D prefix sums give O(1) square sums. Larger sides only get heavier, so binary search the maximum feasible side.
 * Approach: 1. Build prefixSumGrid. 2. Binary search side in [1, min(m,n)]. 3. checkSquareValidity scans every top-left; if any square sum <= threshold, try larger. 4. Return finalMaxSideLength.
 * Dry Run: mat=[[1,1,3],[1,1,3],[1,1,3]], threshold=4
 *   side 2: some 1+1+1+1=4 ok. side 3: sums exceed. Return 2.
 * Time Complexity: O(m * n * log(min(m, n)))
 * Space Complexity: O(m * n)
 */
var maxSideLength = function (inputMatrix, sumThreshold) {
  const matrixRows = inputMatrix.length;
  if (matrixRows === 0) {
    return 0;
  }
  const matrixCols = inputMatrix[0].length;
  if (matrixCols === 0) {
    return 0;
  }

  const prefixSumGrid = Array(matrixRows + 1)
    .fill(null)
    .map(() => Array(matrixCols + 1).fill(0));

  for (let currentR = 0; currentR < matrixRows; currentR++) {
    for (let currentC = 0; currentC < matrixCols; currentC++) {
      prefixSumGrid[currentR + 1][currentC + 1] =
        inputMatrix[currentR][currentC] +
        prefixSumGrid[currentR][currentC + 1] +
        prefixSumGrid[currentR + 1][currentC] -
        prefixSumGrid[currentR][currentC];
    }
  }

  let minSideSearch = 1;
  let maxSideSearch = Math.min(matrixRows, matrixCols);
  let finalMaxSideLength = 0;

  const checkSquareValidity = (sideToVerify) => {
    for (
      let checkRowIter = 0;
      checkRowIter <= matrixRows - sideToVerify;
      checkRowIter++
    ) {
      for (
        let checkColIter = 0;
        checkColIter <= matrixCols - sideToVerify;
        checkColIter++
      ) {
        const bottomRowIdx = checkRowIter + sideToVerify;
        const bottomColIdx = checkColIter + sideToVerify;

        const currentSquareSum =
          prefixSumGrid[bottomRowIdx][bottomColIdx] -
          prefixSumGrid[checkRowIter][bottomColIdx] -
          prefixSumGrid[bottomRowIdx][checkColIter] +
          prefixSumGrid[checkRowIter][checkColIter];

        if (currentSquareSum <= sumThreshold) {
          return true;
        }
      }
    }
    return false;
  };

  while (minSideSearch <= maxSideSearch) {
    const potentialSide = Math.floor((minSideSearch + maxSideSearch) / 2);
    if (checkSquareValidity(potentialSide)) {
      finalMaxSideLength = potentialSide;
      minSideSearch = potentialSide + 1;
    } else {
      maxSideSearch = potentialSide - 1;
    }
  }

  return finalMaxSideLength;
};
