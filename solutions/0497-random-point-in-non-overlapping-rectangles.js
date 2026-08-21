/**
 * Random Point In Non Overlapping Rectangles
 * Intuition: Rectangles are weighted by integer point count (width+1)×(height+1). Pick a random index in [0, totalPoints), binary-search-by-scan the prefix sums to choose a rectangle, then uniform offsets inside it.
 * Approach: 1. Constructor: for each rect accumulate point counts into `cumulativePointCounts` and `grandTotalPoints`. 2. `pick`: `randomNumberPick` in [0, total). Linear scan for the first prefix > that pick. 3. Inside that rect, `x = x1 + rand*(x2-x1+1)`, same for y.
 * Dry Run: rects = [[1,1,5,5]] (25 points).
 *   - Prefix [25]. Any pick 0..24 selects rect 0; e.g. offsets give a point in [1,5]×[1,5].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var Solution = function (rects) {
  this.rectangleData = rects;
  this.cumulativePointCounts = [];
  let currentCumulativeSum = 0;

  for (let singleRectangleData of this.rectangleData) {
    const [startXCoord, startYCoord, endXCoord, endYCoord] =
      singleRectangleData;
    const currentWidth = endXCoord - startXCoord + 1;
    const currentHeight = endYCoord - startYCoord + 1;
    const pointsInCurrentRectangle = currentWidth * currentHeight;
    currentCumulativeSum += pointsInCurrentRectangle;
    this.cumulativePointCounts.push(currentCumulativeSum);
  }
  this.grandTotalPoints = currentCumulativeSum;
};

Solution.prototype.pick = function () {
  const randomNumberPick = Math.floor(Math.random() * this.grandTotalPoints);
  let selectedRectangleIndex = 0;
  const rectsLen = this.cumulativePointCounts.length;

  for (let idx = 0; idx < rectsLen; idx++) {
    if (this.cumulativePointCounts[idx] > randomNumberPick) {
      selectedRectangleIndex = idx;
      break;
    }
  }

  const chosenRectangleDetails = this.rectangleData[selectedRectangleIndex];
  const [xOne, yOne, xTwo, yTwo] = chosenRectangleDetails;

  const offsetXValue = Math.floor(Math.random() * (xTwo - xOne + 1));
  const chosenXCoordinate = xOne + offsetXValue;

  const offsetYValue = Math.floor(Math.random() * (yTwo - yOne + 1));
  const chosenYCoordinate = yOne + offsetYValue;

  return [chosenXCoordinate, chosenYCoordinate];
};
