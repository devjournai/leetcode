/**
 * Falling Squares
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var fallingSquares = function (positionsCollection) {
  const storedSquaresMapping = new Map();
  const resultHeights = [];
  let overallHighestStack = 0;

  for (
    let squarePositionIndex = 0;
    squarePositionIndex < positionsCollection.length;
    squarePositionIndex++
  ) {
    const currentSquareData = positionsCollection[squarePositionIndex];
    const currentSquareLeftBoundary = currentSquareData[0];
    const currentSquareSideLength = currentSquareData[1];
    const currentSquareRightBoundary =
      currentSquareLeftBoundary + currentSquareSideLength;

    let heightBelowCurrentSquare = 0;

    storedSquaresMapping.forEach(
      (existingSquareProperties, existingSquareLeftBoundary) => {
        const existingSquareSideLength = existingSquareProperties[0];
        const existingSquareAbsoluteHeight = existingSquareProperties[1];
        const existingSquareRightBoundary =
          existingSquareLeftBoundary + existingSquareSideLength;

        if (
          currentSquareRightBoundary > existingSquareLeftBoundary &&
          currentSquareLeftBoundary < existingSquareRightBoundary
        ) {
          heightBelowCurrentSquare = Math.max(
            heightBelowCurrentCurrentSquare,
            existingSquareAbsoluteHeight,
          );
        }
      },
    );

    const currentSquareAbsoluteHeight =
      heightBelowCurrentSquare + currentSquareSideLength;

    storedSquaresMapping.set(currentSquareLeftBoundary, [
      currentSquareSideLength,
      currentSquareAbsoluteHeight,
    ]);

    overallHighestStack = Math.max(
      overallHighestStack,
      currentSquareAbsoluteHeight,
    );

    resultHeights.push(overallHighestStack);
  }

  return resultHeights;
};
