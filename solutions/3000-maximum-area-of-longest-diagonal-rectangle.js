/**
 * Maximum Area Of Longest Diagonal Rectangle
 * Intuition: To find the rectangle with the longest diagonal, we can compare the squares of the diagonals (L^2 + W^2) instead of the actual diagonals (sqrt(L^2 + W^2)) to avoid floating-point arithmetic and `Math.sqrt`, as the square function is monotonically increasing for non-negative numbers. If multiple rectangles have the same longest diagonal, we prioritize the one with the largest area (L * W).
 * Approach: 1. Initialize an accumulator object to keep track of the maximum squared diagonal found so far (`longestDiagonalSquaredValue`) and the corresponding maximum area (`largestAreaFound`). Both start at 0. 2. Iterate through each rectangle in the `dimensions` array using the `reduce` method. 3. For each rectangle, calculate its current squared diagonal (length * length + width * width) and its current area (length * width). 4. Compare the current rectangle's squared diagonal with the `longestDiagonalSquaredValue` in the accumulator: if it's strictly greater, update both `longestDiagonalSquaredValue` and `largestAreaFound`. If it's equal, then compare the current rectangle's area with `largestAreaFound`; if the current area is strictly greater, update only `largestAreaFound`. 5. Return the `largestAreaFound` value from the final accumulator state.
 * Dry Run: dimensions = [[9,3],[8,6]]
 *   Initial accumulator: { currentMaxDiagonalSquared: 0, currentMaxArea: 0 }
 *
 *   1. Process [9,3]:
 *      - rectangleLength = 9, rectangleWidth = 3
 *      - diagonalSquare = 9*9 + 3*3 = 81 + 9 = 90
 *      - calculatedArea = 9 * 3 = 27
 *      - 90 > currentMaxDiagonalSquared (0): True.
 *      - Update accumulator: { currentMaxDiagonalSquared: 90, currentMaxArea: 27 }
 *
 *   2. Process [8,6]:
 *      - rectangleLength = 8, rectangleWidth = 6
 *      - diagonalSquare = 8*8 + 6*6 = 64 + 36 = 100
 *      - calculatedArea = 8 * 6 = 48
 *      - 100 > currentMaxDiagonalSquared (90): True.
 *      - Update accumulator: { currentMaxDiagonalSquared: 100, currentMaxArea: 48 }
 *
 *   Final accumulator after all entries: { currentMaxDiagonalSquared: 100, currentMaxArea: 48 }
 *   Return finalAccumulatedResult.currentMaxArea, which is 48.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var areaOfMaxDiagonal = function (dimensions) {
  const finalAccumulatedResult = dimensions.reduce(
    (accumulatorObject, rectangleEntry) => {
      const rectangleLength = rectangleEntry[0];
      const rectangleWidth = rectangleEntry[1];

      const diagonalSquare =
        rectangleLength * rectangleLength + rectangleWidth * rectangleWidth;
      const calculatedArea = rectangleLength * rectangleWidth;

      if (diagonalSquare > accumulatorObject.currentMaxDiagonalSquared) {
        accumulatorObject.currentMaxDiagonalSquared = diagonalSquare;
        accumulatorObject.currentMaxArea = calculatedArea;
      } else if (
        diagonalSquare === accumulatorObject.currentMaxDiagonalSquared
      ) {
        if (calculatedArea > accumulatorObject.currentMaxArea) {
          accumulatorObject.currentMaxArea = calculatedArea;
        }
      }
      return accumulatorObject;
    },
    { currentMaxDiagonalSquared: 0, currentMaxArea: 0 }
  );

  return finalAccumulatedResult.currentMaxArea;
};
