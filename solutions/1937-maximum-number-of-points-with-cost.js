/**
 * Maximum Number Of Points With Cost
 * Time Complexity: O(m * n)
 * Space Complexity: O(n)
 */
var maxPoints = function (pointsMatrix) {
  const totalRows = pointsMatrix.length;
  const totalColumns = pointsMatrix[0].length;

  let previousRowMaximums = pointsMatrix[0].slice();

  for (
    let currentRowIndex = 1;
    currentRowIndex < totalRows;
    currentRowIndex++
  ) {
    const currentCalculatedRow = new Array(totalColumns).fill(0);
    const leftSideOptimal = new Array(totalColumns).fill(0);
    const rightSideOptimal = new Array(totalColumns).fill(0);

    leftSideOptimal[0] = previousRowMaximums[0];
    for (
      let forwardColumnIndex = 1;
      forwardColumnIndex < totalColumns;
      forwardColumnIndex++
    ) {
      leftSideOptimal[forwardColumnIndex] = Math.max(
        leftSideOptimal[forwardColumnIndex - 1] - 1,
        previousRowMaximums[forwardColumnIndex],
      );
    }

    rightSideOptimal[totalColumns - 1] = previousRowMaximums[totalColumns - 1];
    for (
      let backwardColumnIndex = totalColumns - 2;
      backwardColumnIndex >= 0;
      backwardColumnIndex--
    ) {
      rightSideOptimal[backwardColumnIndex] = Math.max(
        rightSideOptimal[backwardColumnIndex + 1] - 1,
        previousRowMaximums[backwardColumnIndex],
      );
    }

    for (
      let finalColumnIndex = 0;
      finalColumnIndex < totalColumns;
      finalColumnIndex++
    ) {
      currentCalculatedRow[finalColumnIndex] =
        pointsMatrix[currentRowIndex][finalColumnIndex] +
        Math.max(
          leftSideOptimal[finalColumnIndex],
          rightSideOptimal[finalColumnIndex],
        );
    }

    previousRowMaximums = currentCalculatedRow;
  }

  let overallMaximumScore = 0;
  if (totalColumns > 0) {
    overallMaximumScore = Math.max(...previousRowMaximums);
  }

  return overallMaximumScore;
};
