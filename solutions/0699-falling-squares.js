/**
 * Falling Squares
 * Intuition: Each new square lands at the max height of any previously stored square whose x-interval overlaps, then its top is that base plus its side length. The skyline after each drop is the running max top.
 * Approach: 1. Map left → [side, absoluteHeight]. 2. For each position, scan stored squares; if intervals overlap, max into `heightBelowCurrentSquare`. 3. Store new height, update `overallHighestStack`, push to `resultHeights`.
 * Dry Run: positions=[[1,2],[2,3],[6,1]]. First height 2. Second overlaps [1,3) and [2,5) → base 2, top 5. Third no overlap, top 1. Results [2,5,5].
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
            existingSquareAbsoluteHeight
          );
        }
      }
    );

    const currentSquareAbsoluteHeight =
      heightBelowCurrentSquare + currentSquareSideLength;

    storedSquaresMapping.set(currentSquareLeftBoundary, [
      currentSquareSideLength,
      currentSquareAbsoluteHeight,
    ]);

    overallHighestStack = Math.max(
      overallHighestStack,
      currentSquareAbsoluteHeight
    );

    resultHeights.push(overallHighestStack);
  }

  return resultHeights;
};
