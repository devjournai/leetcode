/**
 * Minimum Lines To Represent A Line Chart
 * Intuition: To minimize lines, consecutive points should ideally be collinear. If three adjacent points (P0, P1, P2) lie on the same line, the segment P0-P1 and P1-P2 can be represented by a single line. Otherwise, P1-P2 requires a new line.
 * Approach: 1. Handle edge cases for very few stock points. 2. Sort the stock points by day to ensure proper chronological order for line chart construction. 3. Initialize line count to 1 (for the first segment P0-P1). 4. Iterate from the third point, checking collinearity of the current point with the two preceding points using the cross-product method to avoid division and floating-point errors. 5. If points are not collinear, increment the line count.
 * Dry Run: stockPrices = [[1,1],[2,2],[3,3],[4,2]]
 * Initial: stockPointCount = 4. Not <= 1.
 * Sorted: stockPrices remains [[1,1],[2,2],[3,3],[4,2]] (already sorted by day)
 * lineCount = 1 (for the segment connecting (1,1) and (2,2))
 *
 * Loop currentIndex = 2:
 *   firstPoint = [1,1], secondPoint = [2,2], thirdPoint = [3,3]
 *   deltaOneX = BigInt(2-1) = 1, deltaOneY = BigInt(2-1) = 1
 *   deltaTwoX = BigInt(3-2) = 1, deltaTwoY = BigInt(3-2) = 1
 *   productOne = 1 * 1 = 1
 *   productTwo = 1 * 1 = 1
 *   productOne === productTwo (1 === 1) is true. Points are collinear. lineCount remains 1.
 *
 * Loop currentIndex = 3:
 *   firstPoint = [2,2], secondPoint = [3,3], thirdPoint = [4,2]
 *   deltaOneX = BigInt(3-2) = 1, deltaOneY = BigInt(3-2) = 1
 *   deltaTwoX = BigInt(4-3) = 1, deltaTwoY = BigInt(2-3) = -1
 *   productOne = 1 * 1 = 1
 *   productTwo = -1 * 1 = -1
 *   productOne === productTwo (1 === -1) is false. Points are not collinear. lineCount becomes 2.
 *
 * Loop ends. Return lineCount = 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var minimumLines = function (stockPrices) {
  const stockPointCount = stockPrices.length;

  if (stockPointCount <= 1) {
    return 0;
  }

  stockPrices.sort((pointOne, pointTwo) => pointOne[0] - pointTwo[0]);

  let lineCounter = 1;
  let initialIndex = 2;

  while (initialIndex < stockPointCount) {
    const firstPoint = stockPrices[initialIndex - 2];
    const secondPoint = stockPrices[initialIndex - 1];
    const thirdPoint = stockPrices[initialIndex];

    const firstXCoordinate = BigInt(firstPoint[0]);
    const firstYCoordinate = BigInt(firstPoint[1]);
    const secondXCoordinate = BigInt(secondPoint[0]);
    const secondYCoordinate = BigInt(secondPoint[1]);
    const thirdXCoordinate = BigInt(thirdPoint[0]);
    const thirdYCoordinate = BigInt(thirdPoint[1]);

    const deltaOneXValue = secondXCoordinate - firstXCoordinate;
    const deltaOneYValue = secondYCoordinate - firstYCoordinate;
    const deltaTwoXValue = thirdXCoordinate - secondXCoordinate;
    const deltaTwoYValue = thirdYCoordinate - secondYCoordinate;

    const crossProductOne = deltaOneYValue * deltaTwoXValue;
    const crossProductTwo = deltaTwoYValue * deltaOneXValue;

    if (crossProductOne !== crossProductTwo) {
      lineCounter++;
    }
    initialIndex++;
  }

  return lineCounter;
};
