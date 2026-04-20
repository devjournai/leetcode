/**
 * Number Of Rectangles That Can Form The Largest Square
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countGoodRectangles = function (rectangles) {
  let maximumAchievableSide = 0;

  let indexOne = 0;
  const totalRectangles = rectangles.length;
  while (indexOne < totalRectangles) {
    const currentRectangleDimensions = rectangles[indexOne];
    const rectangleLength = currentRectangleDimensions[0];
    const rectangleWidth = currentRectangleDimensions[1];
    const potentialSide = Math.min(rectangleLength, rectangleWidth);

    if (potentialSide > maximumAchievableSide) {
      maximumAchievableSide = potentialSide;
    }
    indexOne++;
  }

  let goodRectangleCounter = 0;

  let indexTwo = 0;
  while (indexTwo < totalRectangles) {
    const particularRectangle = rectangles[indexTwo];
    const particularLength = particularRectangle[0];
    const particularWidth = particularRectangle[1];
    const formableSide = Math.min(particularLength, particularWidth);

    if (formableSide === maximumAchievableSide) {
      goodRectangleCounter++;
    }
    indexTwo++;
  }

  return goodRectangleCounter;
};
