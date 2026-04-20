/**
 * Random Point In Non Overlapping Rectangles
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var Solution = function (rects) {
  this.rectangleData = rects;
  this.cumulativePointCounts = [];
  let currentCumulativeSum = 0;

  for (let singleRectangleData of this.rectangleData) {
    const [startXCoord, startYCoord, endXCoord, endYCoord] = singleRectangleData;
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